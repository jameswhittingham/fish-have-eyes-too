angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localstorage, $rootScope, $state, $window) {

  $rootScope.editMode = false;

  $scope.getHeight = function(itemsOnRow, total){
    var rows = total/itemsOnRow,
      retVal = 100/Math.ceil(rows);
    return retVal + 'vh';
  }

  $scope.updateItems = function(thisTotal) {
    $rootScope.colorData['total'] = thisTotal;

    var items = $rootScope.colorData.items,
      total = $rootScope.colorData.total;

    if (parseInt(total) <= items.length) {
      items = items.slice(0, total);
    } else {
      var dif = parseInt(total) - items.length;
      for (var i = 0; i < dif; i++) {
        var item = {id: i, red: 255, green: 255, blue: 255, alpha: 1, count: 0};
        items.push(item);
      }
    }

    $rootScope.colorData.items = items;
  };

  $scope.updateEditable = function() {
    $rootScope.editMode = !$rootScope.editMode;
  }

  // Create the modal that we will use later
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  // Create the modal that we will use later
  $ionicModal.fromTemplateUrl('templates/modal-2.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal2.hide();
  };

  $scope.showModal = function(title, colorObj, ind, show) {
    if (show == true) {
      $scope.modalTitle = title;
      $scope.editableObject = colorObj;
      $scope.ind = ind;
      $scope.selectedColor = $scope.colorData[colorObj];
      if (ind != null) {
        $scope.selectedColor = $scope.colorData[colorObj][ind];
      }
      $scope.modal.show();
    }
  };
  $scope.showModal2 = function() {
    $scope.modal2.show();
  };

  $scope.trackClick = function(trackIt, obj, ind) {
    if(!trackIt) {
      var count = $scope.colorData[obj][ind]['count'] || 0;
      $scope.colorData[obj][ind]['count'] = count + 1;
    }
  }

  $scope.getNumber = function(num){
    return new Array(num);
  }

  $scope.saveColor = function() {
    var colorObj = $scope.editableObject,
      ind = $scope.ind;
    
    if (ind != null) {
      $scope.colorData[colorObj][ind] = $scope.selectedColor;
    } else {
      $scope.colorData[colorObj] = $scope.selectedColor;
    }
  }

  $scope.saveSet = function(setName) {
    var retData = $localstorage.get("fishHaveEyesData"),
      id = 0;
    if (retData) {
      colorDataArray = JSON.parse(retData);
      if (colorDataArray.length > 0) {
        id = colorDataArray[colorDataArray.length-1].id + 1;
      };
    } else {
      colorDataArray = [];
    }

    var newObj = {
      'id': id,
      'name': setName, 
      'data': $rootScope.colorData
    }
    colorDataArray.push(newObj);
    $localstorage.set("fishHaveEyesData", colorDataArray);

    $rootScope.currentSet = setName;

    $scope.modal2.hide();
  }
})

.controller('LoadCtrl', function($scope, $ionicModal, $timeout, $localstorage, $rootScope, $state, $window) {
  var retData = $localstorage.get('fishHaveEyesData', "");

  if (retData && retData != "null") {
    $scope.loadData = JSON.parse(retData.toString());
  }

  $scope.loadSet = function(ind) {
    $rootScope.colorData = $scope.loadData[ind].data;
    $rootScope.currentSet = $scope.loadData[ind].name;
    $rootScope.currentInd = $scope.loadData[ind].id;
    //$state.go('app.home');
  }

  $scope.deleteSet = function(ind) {
    $scope.loadData.splice(ind, 1);
    $localstorage.set("fishHaveEyesData", $scope.loadData);
  }

})