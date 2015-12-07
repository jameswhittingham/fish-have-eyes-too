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
        var item = {id: i, red: 255, green: 255, blue: 255, alpha: 1};
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

  $scope.closeModal = function() {
    $scope.modal.hide();
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

})