define(['controllers/controllerModule', 'directives/directiveModule', 'jquery', 'underscore'], function(controllerModule, directiveModule, $, underscore) {
    directiveModule.directive('categoryDualList', ["$filter", "$timeout", "sharedService", function($filter, $timeout, sharedService) {
        var diffArray = [];
        return {
            restrict: 'E',
            scope: {
                availableItems: '=availableItems',
                selectedItems: '=selectedItems',
                availableItemsLength: '=availableItemsLength',
                selectedItemsLength: '=selectedItemsLength'
            },
            templateUrl: 'views/categoriesDualList.html',
            link: function(scope, elem, attrs) {

                scope.$watch("availablefilterText", function(query) {
                    scope.availableItemsLength = $filter("filter")(scope.availableItems, query).length;
                });

                scope.$watch("searchSelected", function(query) {
                    scope.selectedItemsLength = $filter("filter")(scope.selectedItems, query).length;
                });

                //fix for Categories filter box to display 3rd character and start search
                scope.availablefilterText = '';
                var tempFilterText = '',
                    filterTextTimeout;
                scope.$watch('searchText', function(val) {
                    if (filterTextTimeout)
                        $timeout.cancel(filterTextTimeout);
                    tempFilterText = val;
                    filterTextTimeout = $timeout(function() {
                        scope.availablefilterText = tempFilterText;
                    }, 250);
                });

                $('.filter-unselected').on('keyup', function() {
                    var currentTarget = $(this);
                    var value = currentTarget.val();
                    if (value.length >= 3) {
                        $(".unselectedPromptMsg").css("display", "none");
                        $(this).addClass('filterimg');
                        if($(".unselected").children().length===0){
                            currentTarget.removeClass('filterimg');
                        }
                        var search = setTimeout(function() {
                           currentTarget.removeClass('filterimg');
                        }, 500);
                    } else if (value.length < 3) {
                        $(".unselectedPromptMsg").css("display", "block");
                        $(this).removeClass('filterimg');
                        if (value == "") $(".unselectedPromptMsg").css("display", "none");
                    }
                });
                $('.filter-selected').on('keyup', function() {
                    var currentTarget = $(this);
                    var value = currentTarget.val();
                    if (value.length >= 3) {
                        $(".unselectedPromptMsg").css("display", "none");
                        $(this).addClass('filterimg');
                        var prevRecords = $(".selected").html();
                        if ($(".selected").children().length === 0 && value) {
                            currentTarget.removeClass('filterimg');
                        } else {
                            var selectedSearch = setInterval(function() {
                                var newRecords = $(".selected").html();
                                if (prevRecords != newRecords) {
                                    currentTarget.removeClass('filterimg');
                                    clearInterval(selectedSearch);
                                }
                            }, 1000);
                            var selectedSearchTimeout = setInterval(function() {
                                var newRecords = $(".selected").html();
                                if (prevRecords == newRecords) {
                                    currentTarget.removeClass('filterimg');
                                    clearInterval(selectedSearchTimeout);
                                }
                            }, 500);
                        }
                    } else if (value.length < 3) {
                        if (value.length >= 1) {
                            $(".selectedPromptMsg").css("display", "block");
                            $(this).removeClass('filterimg');
                        }
                        if ($(".selected").children().length === 0) {
                            $(".selectedPromptMsg").css("display", "none");
                        }
                    }
                });

                $('.unselected').change(function(event) {
                    scope.$apply(function() {
                        $(".unselected option:selected").removeAttr("selected");
                          $('#toRight').attr('disabled',false);
                    });
                });
                 $('.selected').change(function(event) {
                    scope.$apply(function() {
                       
                         $('#toRemove').attr('disabled',false);
                    });
                });

                scope.keyFuntion = function(e) {
                    e.preventDefault();
                    return false;
                }


                scope.removeFromRight = function(item, from, to) {
                    if (item !== undefined) {
                        angular.forEach(item, function(value, key) {

                            from = _.difference(from, item);
                        });
                        scope.selectedItemsLength = from.length;
                        scope.availableItemsLength = to.length;
                        scope.availableItems = to;
                        scope.selectedItems = from
                        sharedService.setSelectedCategories(from);
                    }
                    if ($(".selected").children().length === 0) {
                            $("#toRemove").attr("disabled", true);
                        }
                        else{
                            $('#toRight').attr('disabled',true);
                              $("#toRemove").removeAttr("disabled");
                        }
                }

                scope.copyToRight = function(item, from, to) {
                    if (item !== undefined) {
                        $.each(item, function(index, obj) {
                            var found = false;
                            $.each(to, function(tempI, tempObj) {
                                if (tempObj.id == obj.id) {
                                    found = true;
                                    return false;
                                }
                            });

                            if (!found) {
                                to.push(obj);
                            }
                        });
                        scope.availableItemsLength = from.length;
                        scope.selectedItemsLength = to.length;
                        scope.availableItems = from;
                        scope.selectedItems = to;
                        sharedService.setSelectedCategories(to);
                        $(".unselected option:selected").removeAttr("selected");

                        if (scope.selectedItemsLength) {
                            if ($('.filter-selected').val().length >= 1 && $('.filter-selected').val().length < 3) {
                                $(".selectedPromptMsg").css("display", "block");
                            }
                        }
                    }
                     if ($(".selected").children().length === 0) {
                            $("#toRemove").attr("disabled", true);
                        }
                        else{
                            $('#toRight').attr('disabled',true);
                             $("#toRemove").removeAttr("disabled");
                        }

                };

            }
        }
    }]);

});
