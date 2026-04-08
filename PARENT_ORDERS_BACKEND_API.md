# 📋 تعليمات تطبيق Parent Orders System - Backend API

## نظرة عامة
نظام دمج الطلبيات يسمح بربط طلبيتين أو أكثر تحت طلبية واحدة "Parent" بحيث:
- **الطلبية الأم (Parent)**: تحتوي على عدة طلبيات مدموجة تحتها
- **الطلبيات المدموجة (Children)**: طلبيات مرتبطة بطلبية أم
- **الطلبية العادية (Normal)**: ليست parent ولا child

---

## 🔧 التعديلات المطلوبة على قاعدة البيانات

### جدول `wc_fabric_order_requisitions` (أو الجدول المناسب)

أضف الحقول التالية:

```sql
ALTER TABLE wc_fabric_order_requisitions 
ADD COLUMN parent_wc_fabric_order_requisition_id VARCHAR(255) NULL DEFAULT NULL,
ADD COLUMN is_parent BOOLEAN DEFAULT FALSE,
ADD INDEX idx_parent_wc_fabric_order_requisition_id (parent_wc_fabric_order_requisition_id);
```

**شرح الحقول:**
- `parent_wc_fabric_order_requisition_id`: ID الطلبية الأم (NULL للطلبيات العادية والأم)
- `is_parent`: true إذا كانت هذه الطلبية لديها children مدموجة تحتها

---

## 📡 الـ APIs المطلوب تطبيقها

### 1️⃣ API: جلب الطلبيات مع معلومات Parent

**Endpoint:**
```
GET /wc-fabric-order-requisition/with-parent-info/:status
```

**Parameters:**
- `status`: "opened" أو "closed"

**Description:**
يرجع جميع الطلبيات مع معلومات الدمج. يجب إرجاع فقط:
- الطلبيات الأم (Parent) التي لديها children
- الطلبيات العادية (التي ليست child)
- ❌ لا يرجع الطلبيات الـ Children (التي لديها parent_id)

**Response Structure:**
```json
[
  {
    "id": "order_1",
    "name": "طلبية محمد",
    "number": "1001",
    "date": "2024-01-15",
    "seller_name": "محمد أحمد",
    "current_quantity": 500,
    "is_active": "1",
    
    // حقول الدمج
    "is_parent": true,
    "parent_wc_fabric_order_requisition_id": null,
    "parent_name": null,
    "merged_count": 3,              // عدد الطلبيات المدموجة تحتها (بما فيها نفسها)
    "total_quantity": 1500,         // مجموع كميات جميع الطلبيات المدموجة
    
    // باقي الحقول...
    "requestionDetails": [...]      // يمكن إرجاع أو عدم إرجاع التفاصيل حسب الحاجة
  },
  {
    "id": "order_5",
    "name": "طلبية علي",
    "number": "1005",
    "is_parent": false,
    "parent_wc_fabric_order_requisition_id": null,
    "parent_name": null,
    "merged_count": 1,              // طلبية عادية
    "total_quantity": null,         // أو يمكن = current_quantity
    // ...
  }
]
```

**SQL Query Example:**
```sql
SELECT 
    o.*,
    o.parent_wc_fabric_order_requisition_id IS NULL AND EXISTS(
        SELECT 1 FROM wc_fabric_order_requisitions c 
        WHERE c.parent_wc_fabric_order_requisition_id = o.id
    ) as is_parent,
    (SELECT COUNT(*) FROM wc_fabric_order_requisitions c 
     WHERE c.parent_wc_fabric_order_requisition_id = o.id OR c.id = o.id
     HAVING o.parent_wc_fabric_order_requisition_id IS NULL) as merged_count,
    (SELECT SUM(current_quantity) FROM wc_fabric_order_requisitions c 
     WHERE c.parent_wc_fabric_order_requisition_id = o.id OR (c.id = o.id AND o.parent_wc_fabric_order_requisition_id IS NULL)
    ) as total_quantity,
    p.name as parent_name
FROM wc_fabric_order_requisitions o
LEFT JOIN wc_fabric_order_requisitions p ON o.parent_wc_fabric_order_requisition_id = p.id
WHERE o.parent_wc_fabric_order_requisition_id IS NULL  -- فقط الطلبيات التي ليست children
  AND o.is_closed = :status
ORDER BY o.date DESC;
```

---

### 2️⃣ API: دمج الطلبيات

**Endpoint:**
```
PUT /wc-fabric-order-requisition/merge-orders
```

**Request Body:**
```json
{
  "orderIds": ["order_1", "order_2", "order_3"],  // جميع الطلبيات (بما فيها الـ Parent)
  "parentOrderId": "order_1"                      // الطلبية الأم من بين القائمة
}
```

**Description:**
دمج مجموعة من الطلبيات تحت طلبية واحدة (Parent).

**Business Logic:**
1. تحقق أن `parentOrderId` موجود ضمن `orderIds`
2. تحقق أن جميع الطلبيات موجودة وليست مغلقة
3. لكل طلبية في `orderIds` ما عدا `parentOrderId`:
   - تحديث `parent_wc_fabric_order_requisition_id = parentOrderId`
4. تحديث `is_parent = true` للطلبية الأم
5. (اختياري) يمكن إخفاء الطلبيات Children من القوائم العادية

**SQL Example:**
```sql
-- تحديث الطلبيات المدموجة
UPDATE wc_fabric_order_requisitions
SET parent_wc_fabric_order_requisition_id = :parentOrderId
WHERE id IN (:childOrderIds)  -- orderIds ما عدا parentOrderId
  AND id != :parentOrderId;

-- تحديث الطلبية الأم
UPDATE wc_fabric_order_requisitions
SET is_parent = TRUE
WHERE id = :parentOrderId;
```

**Response:**
```json
{
  "status": 1,
  "message": "تم دمج الطلبيات بنجاح"
}
```

---

### 3️⃣ API: فصل جميع الطلبيات المدموجة

**Endpoint:**
```
PUT /wc-fabric-order-requisition/detach-order/:parentId
```

**Parameters:**
- `parentId`: ID الطلبية الأم (Parent)

**Description:**
فصل جميع الطلبيات المدموجة تحت الطلبية الأم (إزالة ارتباطها بالـ Parent).

**Business Logic:**
1. تحقق أن الطلبية الأم موجودة ولديها `is_parent = true`
2. تحديث جميع الطلبيات الـ Children:
   - تحديث `parent_wc_fabric_order_requisition_id = NULL` لجميع الطلبيات المدموجة
3. تحديث الطلبية الأم:
   - تحديث `is_parent = FALSE`

**SQL Example:**
```sql
-- تحقق من أن الطلبية هي Parent
SELECT is_parent INTO @is_parent_order
FROM wc_fabric_order_requisitions 
WHERE id = :parentId;

-- فصل جميع الطلبيات المدموجة تحتها
UPDATE wc_fabric_order_requisitions
SET parent_wc_fabric_order_requisition_id = NULL
WHERE parent_wc_fabric_order_requisition_id = :parentId;

-- تحديث حالة الـ Parent
UPDATE wc_fabric_order_requisitions
SET is_parent = FALSE
WHERE id = :parentId;
```

**Response:**
```json
{
  "status": 1,
  "message": "تم فصل جميع الطلبيات بنجاح"
}
```

---

### 4️⃣ API: عرض الطلبيات المدموجة تحت Parent

**Endpoint:**
```
GET /wc-fabric-order-requisition/merged-orders/:parentId
```

**Parameters:**
- `parentId`: ID الطلبية الأم

**Description:**
يرجع قائمة بجميع الطلبيات المدموجة تحت طلبية أم معينة (Children فقط).

**Response Structure:**
```json
[
  {
    "id": "order_2",
    "name": "طلبية أحمد",
    "number": "1002",
    "current_quantity": 400,
    "created_at": "2024-01-15T10:30:00Z"
  },
  {
    "id": "order_3",
    "name": "طلبية فاطمة",
    "number": "1003",
    "current_quantity": 600,
    "created_at": "2024-01-16T14:20:00Z"
  }
]
```

**SQL Example:**
```sql
SELECT 
    id,
    name,
    number,
    current_quantity,
    created_at
FROM wc_fabric_order_requisitions
WHERE parent_wc_fabric_order_requisition_id = :parentId
ORDER BY created_at ASC;
```

---

## 🎯 سيناريوهات الاستخدام

### سيناريو 1: دمج 3 طلبيات
```
قبل الدمج:
- Order 1: parent_wc_fabric_order_requisition_id=null, is_parent=false
- Order 2: parent_wc_fabric_order_requisition_id=null, is_parent=false
- Order 3: parent_wc_fabric_order_requisition_id=null, is_parent=false

بعد الدمج (Order 1 هو Parent):
- Order 1: parent_wc_fabric_order_requisition_id=null, is_parent=true
- Order 2: parent_wc_fabric_order_requisition_id="order_1", is_parent=false
- Order 3: parent_wc_fabric_order_requisition_id="order_1", is_parent=false

النتيجة في API الجلب:
- يظهر Order 1 فقط مع merged_count=3, total_quantity=مجموع الكميات
- Order 2 و Order 3 لا يظهران في القائمة الرئيسية
```

### سيناريو 2: فصل جميع الطلبيات المدموجة
```
قبل الفصل:
- Order 1: parent_wc_fabric_order_requisition_id=null, is_parent=true
- Order 2: parent_wc_fabric_order_requisition_id="order_1"
- Order 3: parent_wc_fabric_order_requisition_id="order_1"

بعد فصل Order 1 (فصل جميع الطلبيات المدموجة):
- Order 1: parent_wc_fabric_order_requisition_id=null, is_parent=false (أصبحت عادية)
- Order 2: parent_wc_fabric_order_requisition_id=null, is_parent=false (أصبحت عادية)
- Order 3: parent_wc_fabric_order_requisition_id=null, is_parent=false (أصبحت عادية)

النتيجة:
- جميع الطلبيات الآن منفصلة وتظهر في القائمة الرئيسية كطلبيات عادية
```

---

## ✅ نقاط مهمة

1. **عدم حذف البيانات**: الدمج لا يحذف أي طلبيات، فقط يربطهما
2. **الكميات**: 
   - `current_quantity`: الكمية الفعلية للطلبية
   - `total_quantity`: مجموع كميات Parent + جميع Children
3. **العمليات على Parent**: 
   - عند البيع/التنفيذ/النقل للـ Parent، يجب توزيع الكميات على الـ Children تلقائياً
   - أو يمكن إدارة الكميات على مستوى Parent مباشرة
4. **القوائم**: في القوائم الرئيسية، تظهر فقط Parent Orders والطلبيات العادية
5. **التفاصيل**: يمكن إخفاء `requestionDetails` للـ Parent Orders لتحسين الأداء

---

## 🧪 اختبار الـ APIs

### اختبار 1: جلب البيانات
```bash
GET /wc-fabric-order-requisition/with-parent-info/opened
```
**التحقق:**
- ✅ لا تظهر طلبيات لديها parent_wc_fabric_order_requisition_id
- ✅ الطلبيات الأم تحتوي على merged_count و total_quantity صحيحة

### اختبار 2: دمج طلبيات
```bash
PUT /wc-fabric-order-requisition/merge-orders
Body: {
  "orderIds": ["id1", "id2", "id3"],
  "parentOrderId": "id1"
}
```
**التحقق:**
- ✅ id2 و id3 الآن لديهما parent_wc_fabric_order_requisition_id = "id1"
- ✅ id1 الآن is_parent = true

### اختبار 3: فصل جميع الطلبيات المدموجة
```bash
PUT /wc-fabric-order-requisition/detach-order/id1
```
**التحقق:**
- ✅ id2 و id3 الآن parent_wc_fabric_order_requisition_id = null
- ✅ id1 الآن is_parent = false
- ✅ id1, id2, id3 جميعها أصبحت طلبيات منفصلة عادية

### اختبار 4: عرض المدموجة
```bash
GET /wc-fabric-order-requisition/merged-orders/id1
```
**التحقق:**
- ✅ يرجع قائمة بالطلبيات التي parent_wc_fabric_order_requisition_id = "id1"

---

## 📞 للتفعيل في Frontend

بعد تطبيق جميع الـ APIs، في ملف:
```
fabric-order-requisition-show-all-wc.component.ts
```

غيّر السطر:
```typescript
const useNewAPI = false;  // ← غيّر إلى true
```

---

## 💡 نصائح إضافية

1. **Performance**: استخدم indexes على parent_wc_fabric_order_requisition_id
2. **Validation**: تحقق من عدم إنشاء دورات (Order A parent of B, B parent of A)
3. **Transactions**: استخدم transactions للحفاظ على تناسق البيانات
4. **Logging**: سجل جميع عمليات الدمج والفصل للتدقيق
5. **Error Handling**: تعامل مع الحالات الاستثنائية (طلبية محذوفة، مغلقة، إلخ)

---

تم إنشاء هذا الملف بواسطة GitHub Copilot 🤖
التاريخ: 17 فبراير 2026
