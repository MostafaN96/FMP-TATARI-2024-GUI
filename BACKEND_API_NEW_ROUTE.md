# Backend API - New Route for Dyed Fabric Order Requisitions by WC Fabric Order IDs

## File Location
Add this route to your backend router file (likely in routes for `we-dyed-fabric-order-requisition`)

## Route Definition

```javascript
// POST: Get dyed fabric order requisitions by WC fabric order IDs
router.post('/by-wc-fabric-order-ids', authorization, (req, res) => {
  const { wcFabricOrderIds } = req.body;
  
  if (!wcFabricOrderIds || !Array.isArray(wcFabricOrderIds) || wcFabricOrderIds.length === 0) {
    return res.status(400).json({ error: 'wcFabricOrderIds array is required' });
  }

  selectDyedFabricsByWcFabricOrderIds(wcFabricOrderIds)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
```

## Query Function
Add this function to your query file (likely `we-dyed-fabric-order-requisition-details.js` or similar):

```javascript
const selectDyedFabricsByWcFabricOrderIds = (wcFabricOrderIds) => {
  const weDyedFabricOrderRequisitionTableName = 'we_dyed_fabric_order_requisition';
  const weDyedFabricOrderRequisitionDetailsTableName = 'we_dyed_fabric_order_requisition_details';
  const wcFabricOrderRequisitionTableName = 'wc_fabric_order_requisition';
  
  return db(weDyedFabricOrderRequisitionTableName)
    .select(
      `${weDyedFabricOrderRequisitionTableName}.id`,
      `${weDyedFabricOrderRequisitionTableName}.name`,
      `${weDyedFabricOrderRequisitionTableName}.number`,
      `${weDyedFabricOrderRequisitionTableName}.date`,
      `${weDyedFabricOrderRequisitionTableName}.seller_id`,
      `${weDyedFabricOrderRequisitionTableName}.is_closed`,
      db.raw('GROUP_CONCAT(DISTINCT ??.??) as wc_fabric_order_ids', [
        weDyedFabricOrderRequisitionDetailsTableName,
        'wc_fabric_order_requisition_id'
      ])
    )
    .innerJoin(
      weDyedFabricOrderRequisitionDetailsTableName,
      `${weDyedFabricOrderRequisitionDetailsTableName}.we_dyed_fabric_order_requisition_id`,
      `${weDyedFabricOrderRequisitionTableName}.id`
    )
    .whereIn(
      `${weDyedFabricOrderRequisitionDetailsTableName}.wc_fabric_order_requisition_id`,
      wcFabricOrderIds
    )
    .groupBy(`${weDyedFabricOrderRequisitionTableName}.id`)
    .orderBy(`${weDyedFabricOrderRequisitionTableName}.date`, 'desc');
};

module.exports = {
  // ... other exports
  selectDyedFabricsByWcFabricOrderIds
};
```

## Database Schema Expected

This query assumes your `we_dyed_fabric_order_requisition_details` table has:
- `wc_fabric_order_requisition_id` column linking to the raw fabric order (WC)

## How It Works

1. Frontend sends an array of `wc_fabric_order_requisition_id` values
2. Backend queries `we_dyed_fabric_order_requisition_details` table 
3. Joins with `we_dyed_fabric_order_requisition` to get order header info
4. Returns all dyed fabric orders (WE) that are related to any of the provided WC fabric order IDs
5. Groups by order to avoid duplicates and includes list of related WC order IDs

## Testing the API

Use Postman or similar tool:

**POST** `http://your-backend-url/we-dyed-fabric-order-requisition/by-wc-fabric-order-ids`

**Headers:**
```
Authorization: Bearer <your-token>
Content-Type: application/json
```

**Body:**
```json
{
  "wcFabricOrderIds": ["uuid-1", "uuid-2", "uuid-3"]
}
```

**Expected Response:**
```json
[
  {
    "id": "we-order-uuid-1",
    "name": "طلبية جاهز 1",
    "number": "001",
    "date": "2024-04-13",
    "seller_id": "seller-uuid",
    "is_closed": 0,
    "wc_fabric_order_ids": "uuid-1,uuid-2"
  },
  {
    "id": "we-order-uuid-2",
    "name": "طلبية جاهز 2",
    "number": "002",
    "date": "2024-04-12",
    "seller_id": "seller-uuid",
    "is_closed": 0,
    "wc_fabric_order_ids": "uuid-3"
  }
]
```

## Integration Steps

1. Add the route to your backend router file
2. Add the query function to your query file
3. Export the function from the query file
4. Import the function in your router file
5. Restart your backend server
6. The frontend is already configured to use this new endpoint
