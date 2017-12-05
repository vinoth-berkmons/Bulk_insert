
function config($stateProvider) {
    $stateProvider
        .state('index.bulkinsert', {
            url: "/bulkinsert",
            templateUrl: "views/bulkinsert/bulkinsert.html",
            data: {pageTitle: 'Bulk Insert'}
        })
}

function bulkInsertCtrl($scope, $filter, countryService){


    //store all items
    $scope.addedItems = [];

    //country selection
    countryService.populateCountries("country2");
    countryService.populateCountries("country3");


    //Invoice edit call
    $scope.invoiceEdit = function(item){
        $scope.invoice = item;
    };

    //check checkbox for item
    $scope.checkItem = function(item){

        if(item){
            $scope.showLineItem = true;
        }
        else {
            $scope.showLineItem = false;
        }
    };


    //Check filter Date
    $scope.checkDate = function(item){

        if(!item){
            $scope.from = '';
            $scope.to = '';
        }

    };

    //Check filter amount
    $scope.checkAmount = function(item){

        if(!item){
            $scope.from = '';
            $scope.to = '';
        }

    };



    //Future Date disable
    $(function(){
        var dtToday = new Date();

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();

        var maxDate = year + '-' + month + '-' + day;
        $('#invoiceDate, #approvalInvoice').attr('max', maxDate);
    });

    //date format
    $scope.returnDate = function(val){
        var d = $filter('date')(new Date(val), 'dd/MM/yyyy');
        return d;
    };

    //back to add invoice
    $scope.backToAddInvoice = function(){
        $scope.showBulkInsert = true;
        $scope.showApprovalItems = false;
    };

    //Bulk Insert
    $scope.bulkInsert = {
        invoiceNumber: '',
        invoiceDate: '',
        invoiceAmount: '',
        invoiceDueDate: '',
        customerNumber: '',
        country: '',
        itemName: '',
        itemNumber: ''

    };

    var bulkInserItems = [];

    //All Scopes
    $scope.showBulkInsert = true;
    $scope.showApprovalItems = false;
    $scope.checkLineItem = false;
    $scope.approveDisable = false;

    //save order
    $scope.SaveBulkOrder = function(items){
        $scope.pushItems(items);
        var bulkInsert = {
            invoiceNumber: '',
            invoiceDate: '',
            invoiceAmount: '',
            invoiceDueDate: '',
            customerNumber: '',
            country: '',
            itemName: '',
            itemNumber: ''
        };

        $scope.bulkInsert = angular.copy(bulkInsert);
        $scope.bulkinsert.$setPristine();
        $scope.bulkinsert.$setUntouched();

    };

    //default data
    //$scope.addedItems = [
    //    {
    //        invoiceNumber: '123456',
    //        invoiceDate: '24-7-2017',
    //        invoiceAmount: '100',
    //        invoiceDueDate: '28-7-2017',
    //        customerNumber: '546545',
    //        country: 'India',
    //        itemName: 'Products',
    //        itemNumber: '1234568',
    //        approve: false,
    //        reject: false
    //    },
    //    {
    //        invoiceNumber: '4678',
    //        invoiceDate: '14-7-2014',
    //        invoiceAmount: '1000',
    //        invoiceDueDate: '24-7-2018',
    //        customerNumber: '5454455',
    //        country: 'Australia',
    //        itemName: 'Productsssss',
    //        itemNumber: '123455244568',
    //        approve: false,
    //        reject: false
    //    }
    //];

    //Approval page
    $scope.approveGivenData = function(){
        $scope.showBulkInsert = false;
        $scope.showApprovalItems = true;
    };

    $scope.pushItems = function(item){

        $scope.addedItems.push(item);
    };

    //approve single item
    $scope.approve = function(index, approveMessage){


        if($scope.addedItems.indexOf(index) != -1){
            $scope.addedItems[$scope.addedItems.indexOf(index)].approve = true;
            $scope.addedItems[$scope.addedItems.indexOf(index)].reject = false;


           if(approveMessage){ alert("You have successfully approved");}

        }



    };
    //reject single item
    $scope.reject = function(index, rejectMessage){



        if($scope.addedItems.indexOf(index) != -1){
            $scope.addedItems[$scope.addedItems.indexOf(index)].reject = true;
            $scope.addedItems[$scope.addedItems.indexOf(index)].approve = false;


            if(rejectMessage) {alert("You have successfully rejected");}

        }

    };

    //approve all item
    $scope.approveAll = function(){
        angular.forEach($scope.addedItems, function(v, k){
           $scope.approve(v);
        });

        alert("You have successfully approved  invoices");
    };

    //reject all item
    $scope.rejectAll = function(){
        angular.forEach($scope.addedItems, function(v, k){
            $scope.reject(v);
        });
        alert("You have successfully rejected  invoices");


    };

    //deleted single item
    $scope.delete = function(index){


        if($scope.addedItems.indexOf(index) != -1){
            $scope.addedItems.pop();

            alert("Confirm delete");

        }

    };

    //deleted all item
    $scope.deleteAll = function(){
        $scope.addedItems = [];
        alert("Confirm delete ");
    };


    //edit item
    $scope.editItem = function(invoice){
        angular.forEach($scope.addedItems, function(v, k){
           if(v.invoiceNumber == invoice.invoiceNumber){
               $scope.addedItems[k]= invoice;

           }
        });

        $('#calForEdit').modal('hide');
    };


}

//Filter for search, date, amount
function range($filter){
    return function(item, from, to, check){


        if(check == 'myDate'){
            return item.filter(function(addedItems){


                return $filter('date')(new Date(addedItems.invoiceDueDate), 'dd/MM/yyyy') >=from && $filter('date')(new Date(addedItems.invoiceDueDate), 'dd/MM/yyyy') <= to ;
            });
        }
        else if(check == 'myPrice'){

            return item.filter(function(addedItems){
            return addedItems.invoiceAmount >=from && addedItems.invoiceAmount <= to;
        });
        }
        else{

            return item;
        }


    }
}


angular
    .module('myApp')
    .config(config)
    .controller('bulkInsertCtrl', bulkInsertCtrl)
    .filter('range', range);


