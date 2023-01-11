/**
 * @returns {{initialize: Function, focus: Function, blur: Function}}
 */
geotab.addin.heatmap = () => {
  'use strict';

  let api;

  let elVehicles;
  
    // find reused elements

    elVehicles = document.getElementById('unit');
  


  return {
    initialize(freshApi, state, callback) {
      api = freshApi;

    
        callback();
      

    },
    focus(freshApi, freshState) {
      api = freshApi;
      
      // Populate vehicles list.
      api.call('Get', {
        typeName: 'Device',
        resultsLimit: 50000,
        search: {
          fromDate: new Date().toISOString(),
          groups: freshState.getGroupFilter()
        }
      }, vehicles => {
        if (!vehicles || vehicles.length < 0) {
          return;
        }


        vehicles.forEach(vehicle => {
          let option = new Option();
          option.text = vehicle.name;
          option.value = vehicle.id;
          elVehicles.add(option);
        });
      });

 
    }
  };

};
