define(['controllers/controllerModule','jquery'], function(controllerModule,$) {
	controllerModule.controller('requestInfoController',['$scope','$http','$state','modalService','appUrlService','sharedService',function($scope,$http,$state,modalService,appUrlService,sharedService){
		$scope.viewRequestInfo={};
		var rerunOptions=[
						"Manufacturer",
						"Category",
						"Software Product",
						"Software Product Versions",
						"Hardware Products",
						"Hardware Product Model"
						];
		var viewRequestInfoColumnsDefs=[
			{
				field:'rowNo',
				title:'Row',
				align:'Left',
				valign:'middle'
			},
			{
				field:'requestId',
				title:'Request ID',
				align:'Left',
				valign:'middle'
			},
			{
				field:'type',
				title:'Type',
				align:'Left',
				valign:'middle'
			},
			{
				field:'status',
				title:'Status',
				align:'Left',
				valign:'middle'
			},
			{
				field:'crtdDate',
				title:'Created',
				align:'Left',
				valign:'middle'						
			},
			{
				field:'mdfdDate',
				title:'Modified',
				align:'Left',
				valign:'middle'
			},
			
			{
				field:'linkToReDirect',
				title:'Action',
				align:'Left',
				valign:'middle',
				formatter:rerun,
				events:"actionEvents"
			}
		];
		$scope.viewRequestInfo={
			options:{
				columns:viewRequestInfoColumnsDefs,
				pagination:true,
				sidePagination:'client',
				search:false,
				pageNumber:1, 
				pageSize:10, 
				height:400,
				customClass:'reqInfo',
				url:'/bdnaint/services/requesthistory'
			}
		};
		function rerun(value,row){
			if(row.status!="Completed"){
				return "<a href='#' class='rerun'>View</a>";
			}
		}
        window.actionEvents = {
		    'click .rerun': function (e, value, row, index) {
		    	var rootOptions=["/",
								"categories",
								"productlist",
								"versions",
								"productlist",
								"versions"];
		        sessionStorage.setItem('requestId',row.requestId);
		        for(i=0;i<rerunOptions.length;i++){
		        	if(row.linkToReDirect===rerunOptions[i]){
		        		window.location.href="index.html#/"+rootOptions[i];
		        		if(rerunOptions[i]==="Hardware Products"|| rerunOptions[i]==="Hardware Product Model"){
		        			sessionStorage.radioBtnSelected="Hardwares";
		        		}
		        		if(rerunOptions[i]==="Software Product"|| rerunOptions[i]==="Software Product Versions"){
		        			sessionStorage.radioBtnSelected="Softwares";
		        		}
		        	}
		        }
		    }
		};
        
	}])
});