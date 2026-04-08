# 📝 ملخص التغييرات - نظام دمج الطلبيات

## التغيير الرئيسي
تم تغيير اسم الحقل من `parent_id` إلى `parent_wc_fabric_order_requisition_id` لتوضيح العلاقة وتجنب التعارض مع حقول أخرى.

---

## 🗄️ التغييرات في قاعدة البيانات

### الحقول المطلوب إضافتها:
```sql
ALTER TABLE wc_fabric_order_requisitions 
ADD COLUMN parent_wc_fabric_order_requisition_id VARCHAR(255) NULL DEFAULT NULL,
ADD COLUMN is_parent BOOLEAN DEFAULT FALSE,
ADD INDEX idx_parent_wc_fabric_order_requisition_id (parent_wc_fabric_order_requisition_id);
```

---

## 📡 الـ APIs المطلوب تطبيقها

### 1. جلب الطلبيات مع معلومات Parent
```
GET /wc-fabric-order-requisition/with-parent-info/:status
```
**يجب أن يُرجع:**
- `parent_wc_fabric_order_requisition_id` (string | null)
- `parent_name` (string | null) - اسم الطلبية الأم
- `is_parent` (boolean)
- `merged_count` (number) - عدد الطلبيات المدموجة
- `total_quantity` (number) - مجموع الكميات

### 2. دمج الطلبيات
```
PUT /wc-fabric-order-requisition/merge-orders
Body: {
  "orderIds": ["id1", "id2", "id3"],
  "parentOrderId": "id1"
}
```

### 3. فصل طلبية
```
PUT /wc-fabric-order-requisition/detach-order/:orderId
```

### 4. عرض الطلبيات المدموجة
```
GET /wc-fabric-order-requisition/merged-orders/:parentId
```

---

## 💻 التغييرات في Frontend

### ملفات تم تحديثها:

✅ **fabric-order-requisition-show-all-wc.component.html**
- تم تحديث جميع `parent_id` إلى `parent_wc_fabric_order_requisition_id`
- تم إضافة عرض واضح للـ Parent و Child و Normal orders
- تم إضافة أزرار فصل وعرض الطلبيات المدموجة

✅ **fabric-order-requisition-show-all-wc.component.ts**
- تم إضافة console logs تفصيلية
- تم إضافة متغير `useNewAPI` للتبديل بين API القديم والجديد
- تم إضافة 8 methods جديدة للتعامل مع Parent Orders

✅ **fabric-order-requisition-wc.service.ts**
- تم إضافة 4 methods جديدة:
  * `getOrdersWithParentInfo()`
  * `mergeOrders()`
  * `detachOrder()`
  * `getMergedOrders()`

✅ **fabric-order-requisition-show-all-wc.component.css**
- تم إضافة styles للـ parent-order-row و merged-badge

---

## 🔄 خطوات التفعيل

### للـ Backend Developer:

1. **تطبيق التعديلات على قاعدة البيانات:**
   ```sql
   ALTER TABLE wc_fabric_order_requisitions 
   ADD COLUMN parent_wc_fabric_order_requisition_id VARCHAR(255) NULL DEFAULT NULL,
   ADD COLUMN is_parent BOOLEAN DEFAULT FALSE,
   ADD INDEX idx_parent_wc_fabric_order_requisition_id (parent_wc_fabric_order_requisition_id);
   ```

2. **تطبيق الـ 4 APIs** (راجع ملف `PARENT_ORDERS_BACKEND_API.md`)

3. **اختبار الـ APIs:**
   - GET /wc-fabric-order-requisition/with-parent-info/opened
   - PUT /wc-fabric-order-requisition/merge-orders
   - PUT /wc-fabric-order-requisition/detach-order/:id
   - GET /wc-fabric-order-requisition/merged-orders/:parentId

4. **التأكد من إرجاع الحقول الصحيحة:**
   - ✅ `parent_wc_fabric_order_requisition_id` (وليس `parent_id`)
   - ✅ `parent_name`
   - ✅ `is_parent`
   - ✅ `merged_count`
   - ✅ `total_quantity`

### للـ Frontend Developer:

بعد تطبيق Backend APIs، في ملف:
```
fabric-order-requisition-show-all-wc.component.ts
```

غيّر السطر (~72):
```typescript
const useNewAPI = false;  // ← غيّر إلى true
```

---

## ✅ قائمة التحقق النهائية

### Backend:
- [ ] إضافة حقل `parent_wc_fabric_order_requisition_id` للجدول
- [ ] إضافة حقل `is_parent` للجدول
- [ ] إضافة index على `parent_wc_fabric_order_requisition_id`
- [ ] تطبيق API: GET /with-parent-info/:status
- [ ] تطبيق API: PUT /merge-orders
- [ ] تطبيق API: PUT /detach-order/:id
- [ ] تطبيق API: GET /merged-orders/:parentId
- [ ] اختبار جميع الـ APIs

### Frontend:
- [x] تحديث HTML لاستخدام `parent_wc_fabric_order_requisition_id`
- [x] تحديث Service بـ 4 methods جديدة
- [x] تحديث Component بـ logic كامل
- [x] إضافة CSS styles
- [x] إضافة console logs للتشخيص
- [ ] تفعيل `useNewAPI = true` (بعد تطبيق Backend)

---

## 🎯 مثال على البيانات المتوقعة

### Response من API الجلب:
```json
{
  "id": "order_123",
  "name": "طلبية محمد",
  "number": "1001",
  "is_parent": true,
  "parent_wc_fabric_order_requisition_id": null,
  "parent_name": null,
  "merged_count": 3,
  "total_quantity": 1500,
  // ... باقي الحقول
}
```

### Response من API المدموجة:
```json
[
  {
    "id": "order_456",
    "name": "طلبية أحمد",
    "number": "1002",
    "parent_wc_fabric_order_requisition_id": "order_123",
    "current_quantity": 500
  }
]
```

---

## 📞 للدعم

راجع الملفات التالية للتفاصيل الكاملة:
- `PARENT_ORDERS_BACKEND_API.md` - توثيق كامل للـ Backend APIs
- صندوق المعلومات في أعلى صفحة الطلبيات - إرشادات الاستخدام

---

آخر تحديث: 17 فبراير 2026
