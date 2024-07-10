import { Injectable } from '@angular/core';

// Shared Service
import { ConstantsService } from "src/app/services/constants.service";

@Injectable({
  providedIn: 'root'
})
export class QuantityOccurrencesValidationService {

  constructor(
    private _constantsService: ConstantsService,
  ) { }

  removeIndexFromMapAndArray(map , index ,object,array){
    const obj = array[index]
    array.splice(index,1)

    const numOfOccurrences  = array.reduce((n, val) =>{      
      return n + (val.id === object?.value?.fabricId);
  }, 0);
    if (numOfOccurrences < 2) {
      map.delete(obj)
    }
  }

  validateFabricQuantity(fabricMap: Map<any, any>, selectArrayValues: any[]) {
    let flag = true
    fabricMap.forEach((quantity ,obj )=>{
      let totalQuantity = 0
      for (let i = 0; i < selectArrayValues.length; i++) {
        const fabric = selectArrayValues[i];
        if (obj.id === fabric.fabricId) {
          totalQuantity += +fabric.quantity || 0          
        }
      }
      if (totalQuantity > quantity) {
        // error 
        this._constantsService.quantityOccurrenceErrorMessage(quantity, totalQuantity , obj.name)
        flag = false
        return

      }
    })

    return  flag
  }

  validateQuantityDynamic(dataMap: Map<any, any>, selectArrayValues: any[], 
    leftConditionAttr1, rightConditionAttr1, 
    leftConditionAttr2, rightConditionAttr2, 
    leftConditionAttr3, rightConditionAttr3, 
    quantityAttr, materialNameAttr) {
    let flag = true
    dataMap.forEach((quantity ,obj )=>{
      let totalQuantity = 0
      for (let i = 0; i < selectArrayValues.length; i++) {
        const data = selectArrayValues[i];
        if (obj[leftConditionAttr1] === data[rightConditionAttr1] && 
          obj[leftConditionAttr2] == data[rightConditionAttr2] &&
          obj[leftConditionAttr3] == data[rightConditionAttr3]) {
          totalQuantity += +data[quantityAttr] || 0          
        }
      }
      if (totalQuantity > quantity) {
        // error 
        this._constantsService.quantityOccurrenceErrorMessage(quantity, totalQuantity , obj[materialNameAttr])
        flag = false
        return

      }
    })

    return  flag
  }

  validateQuantity(fabricMap: any[], mapId: string, selectArrayValues: any[], selectedId: string, initialQantityAttr:string, itemName:string, validQantityAttr:string) {
    let flag = true
    // fabricMap.forEach((qantityAttr ,obj )=>{
      for (let j = 0; j < fabricMap.length; j++) {
        const element = fabricMap[j];
      let totalQuantity = 0
      for (let i = 0; i < selectArrayValues.length; i++) {
        const fabric = selectArrayValues[i];
        if (element[mapId] === fabric[selectedId]) {
          totalQuantity += +fabric[initialQantityAttr] || 0          
        }
      }
      if (totalQuantity > element[validQantityAttr]) {
        // error 
        this._constantsService.quantityOccurrenceErrorMessage(element[validQantityAttr], (totalQuantity).toFixed(3) , element[itemName])
        flag = false
        return

      }
    }

    return  flag
  }

  validateCurrentQuantity(
    fabricMap: any[], selectArrayValues: any[], 
    mapId: string, selectedId: string, 
    mapId2: string, selectedId2: string, 
    mapId3: string, selectedId3: string, 
    initialQantityAttr:string, itemName:string, validQantityAttr:string) {
    let flag = true
    // fabricMap.forEach((qantityAttr ,obj )=>{
      for (let j = 0; j < fabricMap.length; j++) {
        const element = fabricMap[j];
      let totalQuantity = 0
      for (let i = 0; i < selectArrayValues.length; i++) {
        const fabric = selectArrayValues[i];
        if (
          element[mapId] === fabric[selectedId] &&
          element[mapId2] === fabric[selectedId2] &&
          element[mapId3] === fabric[selectedId3]
          ) {
          totalQuantity += +fabric[initialQantityAttr] || 0          
        }
      }
      if (totalQuantity > element[validQantityAttr]) {
        // error 
        this._constantsService.quantityOccurrenceErrorMessage(element[validQantityAttr], (totalQuantity).toFixed(3) , element[itemName])
        flag = false
        return

      }
    }

    return  flag
  }

  validateCurrentQuantityTwoItems(
    fabricMap: any[], selectArrayValues: any[], 
    mapId: string, selectedId: string, 
    mapId2: string, selectedId2: string, 
    initialQantityAttr:string, itemName:string, validQantityAttr:string) {
    let flag = true
    // fabricMap.forEach((qantityAttr ,obj )=>{
      for (let j = 0; j < fabricMap.length; j++) {
        const element = fabricMap[j];
      let totalQuantity = 0
      for (let i = 0; i < selectArrayValues.length; i++) {
        const fabric = selectArrayValues[i];
        if (
          element[mapId] === fabric[selectedId] &&
          element[mapId2] === fabric[selectedId2]
          ) {
          totalQuantity += +fabric[initialQantityAttr] || 0          
        }
      }
      if (totalQuantity > element[validQantityAttr]) {
        // error 
        this._constantsService.quantityOccurrenceErrorMessage(element[validQantityAttr], (totalQuantity).toFixed(3) , element[itemName])
        flag = false
        return

      }
    }

    return  flag
  }

  validateQuantitySellDirectWe(fabricMap: any[],  selectArrayValues: any[], 
    mapId: string, selectedId: string, 
    mapId2: string, selectedId2: string, 
    mapId3: string, selectedId3: string, 
    mapId4: string, selectedId4: string, 
    initialQantityAttr:string, itemName:string, validQantityAttr:string) {
    let flag = true
    // fabricMap.forEach((qantityAttr ,obj )=>{
      for (let j = 0; j < fabricMap.length; j++) {
        const element = fabricMap[j];
      let totalQuantity = 0
      for (let i = 0; i < selectArrayValues.length; i++) {
        const fabric = selectArrayValues[i];
        if (element[mapId] === fabric[selectedId] && 
          element[mapId2] === fabric[selectedId2] &&
          element[mapId3] === fabric[selectedId3] &&
          element[mapId4] === fabric[selectedId4]
          ) {
          totalQuantity += +fabric[initialQantityAttr] || 0          
        }
      }
      if (totalQuantity > element[validQantityAttr]) {
        // error 
        this._constantsService.quantityOccurrenceErrorMessage(element[validQantityAttr], (totalQuantity).toFixed(3) , element[itemName])
        flag = false
        return

      }
    }

    return  flag
  }
  
  validateCurrentQuantityTwoItemsReconciliation(
    fabricMap: any[], selectArrayValues: any[], 
    mapId: string, selectedId: string, 
    mapId2: string, selectedId2: string, 
    initialQantityAttr:string, itemName:string, validQantityAttr: any[], inputOutput: string) {
    let flag = true
    // fabricMap.forEach((qantityAttr ,obj )=>{
      for (let j = 0; j < fabricMap.length; j++) {
        const element = fabricMap[j];
      let totalQuantity = 0
      for (let i = 0; i < selectArrayValues.length; i++) {
        const fabric = selectArrayValues[i];
        if (
          element[mapId] === fabric[selectedId] &&
          element[mapId2] === fabric[selectedId2] &&
          element[inputOutput] == "0" &&
          fabric[inputOutput] == "0"
          ) {
          totalQuantity += +fabric[initialQantityAttr] || 0          
        }
      }
      if (totalQuantity > validQantityAttr[j]) {
        // error 
        this._constantsService.quantityOccurrenceErrorMessage(validQantityAttr[j], (totalQuantity).toFixed(3) , element[itemName])
        flag = false
        return

      }
    }

    return  flag
  }
  
  validateCurrentQuantityThreeItemsReconciliation(
    fabricMap: any[], selectArrayValues: any[], 
    mapId: string, selectedId: string, 
    mapId2: string, selectedId2: string, 
    mapId3: string, selectedId3: string, 
    initialQantityAttr:string, itemName:string, validQantityAttr: any[], inputOutput: string) {
    let flag = true
    // fabricMap.forEach((qantityAttr ,obj )=>{
      for (let j = 0; j < fabricMap.length; j++) {
        const element = fabricMap[j];
      let totalQuantity = 0
      for (let i = 0; i < selectArrayValues.length; i++) {
        const fabric = selectArrayValues[i];
        if (
          element[mapId] === fabric[selectedId] &&
          element[mapId2] === fabric[selectedId2] &&
          element[mapId3] === fabric[selectedId3] &&
          element[inputOutput] == "0" &&
          fabric[inputOutput] == "0"
          ) {
          totalQuantity += +fabric[initialQantityAttr] || 0          
        }
      }
      if (totalQuantity > validQantityAttr[j]) {
        // error 
        this._constantsService.quantityOccurrenceErrorMessage(validQantityAttr[j], (totalQuantity).toFixed(3) , element[itemName])
        flag = false
        return

      }
    }

    return  flag
  }

}
