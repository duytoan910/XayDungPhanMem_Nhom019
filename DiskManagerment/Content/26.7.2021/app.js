﻿var urlAPI = 'http://localhost:3000/api'
var popupNotification,
    modalAddCustomer,
    modalAddDiskTitle,
    validatorAddDiskTitle,
    validatorAddCustomer

$(document).on('ready', function () {
    popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
    modalAddCustomer = $("#modalAddCustomer").kendoWindow({
        visible: false,
        height: 200,
        width: 375,
        resizeable: false,
        draggable: false,
        modal: true,
        title: "Thêm khách hàng",
        open: function (e) {
            validatorAddCustomer = $("#formAddCustomer").kendoValidator().data('kendoValidator');
            $("#modalAddCustomer .btnSaveOrUpdate").bind('click', function (e) {
                e.preventDefault();
                if (validatorAddCustomer.validate()) {
                    $.ajax({
                        url: urlAPI + '/Customer/addCustomer',
                        dataType: "jsonp",
                        type: 'post',
                        data: {
                            customerName: $('#tbx_Create_CustomerName').val(),
                            customerAddress: $('#tbx_Create_Address').val(),
                            customerPhone: $('#tbx_Create_Phone').val()
                        },
                        success: function (result) {
                            refreshGird('#grid_qlkh')
                            modalAddCustomer.close()
                            $('#tbxCustomerID').getKendoDropDownList().dataSource.read()
                            $("#modalAddCustomer .btnResetFeild").click();
                        }
                    })
                } else {
                    noti("Vui lòng nhập đầy đủ thông tin!", "error")
                }
            })
            $("#modalAddCustomer .btnResetFeild").bind('click', function (e) {
                e.preventDefault();
                resetWindow("modalAddCustomer", validatorAddCustomer)
            })
        }
    }).data("kendoWindow");
    modalAddDiskTitle = $("#modalAddDiskTitle").kendoWindow({
        visible: false,
        height: 200,
        width: 375,
        resizeable: false,
        draggable: false,
        modal: true,
        title: "Thêm tựa đĩa",
        open: function (e) {
            validatorAddDiskTitle = $("#formAddDiskTitle").kendoValidator().data('kendoValidator');
            $('#tbx_Create_DiskTitleType').kendoDropDownList({
                dataSource: {
                    transport: {
                        read: {
                            url: urlAPI + "/DiskType/getAllDiskType",
                            dataType: "json"
                        }
                    }
                },
                width: 250,
                value: "Chọn loại đĩa",
                optionLabel: "Chọn loại đĩa",
                dataTextField: "diskName",
                dataValueField: "diskTypeId"
            })
            $("#formAddDiskTitle .btnSaveOrUpdate").bind('click', function (e) {
                e.preventDefault();
                if (validatorAddDiskTitle.validate()) {
                    if (!$('#tbx_Create_DiskTitleType').getKendoDropDownList().value()) {
                        noti("Vui lòng nhập đầy đủ thông tin!", "error")
                        return
                    }
                    $.ajax({
                        url: urlAPI + '/DiskTitle/addDiskTitle',
                        dataType: "jsonp",
                        type: 'post',
                        data: {
                            diskTitleName: "",
                            diskCode: "",
                            diskTypeId: ""
                        },
                        success: function (result) {
                            refreshGird('#grid_qldm_tuadia')
                            modalAddDiskTitle.close()
                            $("#formAddDiskTitle .btnResetFeild").click();
                        }
                    })
                } else {
                    noti("Vui lòng nhập đầy đủ thông tin!", "error")
                }
            })
            $("#formAddDiskTitle .btnResetFeild").bind('click', function (e) {
                e.preventDefault();
                resetWindow("formAddDiskTitle", validatorAddDiskTitle)
            })
        }
    }).data("kendoWindow");

    //click
    $('.btn_Menu_AddCustomer').unbind('click')
    $(document).on('click', '.btn_Menu_AddCustomer', function () {
        modalAddCustomer.center().open();
    })
    $('#btnAddDiskTitle').unbind('click')
    $(document).on('click', '#btnAddDiskTitle', function () {
        modalAddDiskTitle.center().open();
    })
})

$(window).on("resize", function () {
    kendo.resize($(".k-grid"));
});

function noti(content, type = "error") {
    popupNotification.show(content, type);
}

function refreshGird(gridEle) {
    $(gridEle).getKendoGrid().dataSource.read()
}

function resetWindow(windowId, val) {
    $('#' + windowId + ' *:not([disabled])').val("")
    $('#' + windowId + ' [type="radio"]').each(function (id, val) {
        if ($(val).attr('value') == 1) $(val).click()
    })
    $('#' + windowId + ' [data-role="dropdownlist"]:not([disabled])').each(function (id, item) {
        $(item).getKendoDropDownList().select(0)
    })

    setTimeout(function () { val.reset() }, 300)
}

var setup_QLKH = function () {
    var record = 0, grid_qlkh, grid_qlkh_RentalBills;

    grid_qlkh = $("#grid_qlkh").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    url: urlAPI + "/Customer/getCustomer",
                    dataType: "jsonp"
                }
            },
            pageSize: 20
        },
        resizeable: true,
        scrollable: true,
        pageable: true,
        resizable: true,
        sortable: true,
        navigatable: true,
        width: 'auto',
        selectable: "row",
        toolbar: [
            {
                template:
                    '<button id = "btnAddCustomer" class= "btn-success k-button k-button-icontext" > <i class="fas fa-plus-circle"></i> Thêm</button>'
            }, {
                template:
                    '<button id = "btnUpdateCustomer" class= "btn-warning k-button k-button-icontext" > <i class="fas fa-edit"></i> Chỉnh sửa</button>'
            }, {
                template:
                    '<button id = "btnDeleteCustomer" class= "btn-danger k-button k-button-icontext" ><i class="far fa-trash-alt"></i> Xóa</button>'
            }, "excel"
        ],
        excel: {
            allPages: true,
            fileName: "DanhSachKhachHang-(" + moment().format("DD-MM-YYYY") + ")",
            filterable: true
        },
        noRecords: {
            template: "<span style='margin: 0 auto;line-height: 50px;'>Không có dữ liệu!</span>"
        },
        filterable: {
            mode: "row"
        },
        dataBound: function () {
            record = 0

            //click
            $('#btnAddCustomer').unbind('click')
            $(document).on('click', '#btnAddCustomer', function () {
                modalAddCustomer.center().open();
            })

            //hover
            $('#btnUpdateCustomer,#btnUpdateCustomer *').on('mouseover', function () {
                $('[role="row"].k-state-selected').addClass('hoverEdit')
            }).on('mouseout', function () {
                $('[role="row"].k-state-selected').removeClass('hoverEdit')
            })

            $('#btnDeleteCustomer,#btnDeleteCustomer *').on('mouseover', function () {
                $('[role="row"].k-state-selected').addClass('hoverDelete')
            }).on('mouseout', function () {
                $('[role="row"].k-state-selected').removeClass('hoverDelete')
            })
        },
        columns: [{
            template: function () {
                return ++record;
            },
            width: 50,
            title: "STT",
            lockable: false,
            attributes: {
                style: "text-align: center"
            }
        }, {
            field: "customerCode",
            title: "Mã khách hàng",
            width: 150,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "customerName",
            title: "Tên khách hàng",
            width: 250,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "customerPhone",
            title: "Số điện thoại",
            width: 150,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "customerAddress",
            title: "Địa chỉ",
            width: 350,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }],
        change: function (e) {
            var initDs = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: urlAPI + "/RentalBill/getRentalBillDetailByID",
                        type: "get",
                        dataType: "json",
                        data: {
                            cusID: this.dataItem(this.select()).customerID
                        }
                    }
                }
            })
            grid_qlkh_RentalBills.setDataSource(initDs)
        }
    }).data('kendoGrid');

    grid_qlkh_RentalBills = $("#grid_qlkh_RentalBills").kendoGrid({
        selectable: false,
        resizeable: true,
        scrollable: true,
        pageable: true,
        resizable: true,
        sortable: true,
        navigatable: true,
        width: 'auto',
        height: '100%',
        filterable: {
            mode: "row"
        },
        noRecords: {
            template: "<span style='margin: 0 auto;line-height: 50px;'>Không có dữ liệu!</span>"
        },
        dataBound: function () {
            for (var i = 0; i < this.columns.length; i++) {
            }
        },
        columns: [
            {
                field: "customerName",
                title: "Mã đĩa",
                filterable: {
                    cell: {
                        operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            }, {
                field: "customerPhone",
                title: "Tựa đĩa",
                filterable: {
                    cell: {
                        operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            }, {
                field: "customerAddress",
                title: "Ngày thuê",
                filterable: {
                    cell: {
                        operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            }, {
                field: "customerAddress",
                title: "Ngày trả",
                filterable: {
                    cell: {
                        operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            }]
    }).data('kendoGrid');
}

var setup_QLPTH = function () {
    var grid_qlpth, ddl_CustomerSearchID;

    $(document).on('click', '#btnSearch', function (e) {
        e.preventDefault();

        var initDs = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlAPI + "/LateCharge/getAllLateChargeByIDCus",
                    type: "get",
                    dataType: "json",
                    data: {
                        cusID: ddl_CustomerSearchID.value()
                    }
                }
            }
        })
        grid_qlkh_RentalBills.setDataSource(initDs)
    })

    $(document).on('click', '#btnPayment', function (e) {
        e.preventDefault();
        if (!$('#tbxTotalMoney').val()) {
            noti("Bạn chưa chọn khoản trễ nào!", "warning")
            return;
        }
        $("#dialog").kendoDialog({
            width: 220,
            height: 170,
            title: "Thanh toán",
            closable: true,
            modal: true,
            content: `Bạn có muốn thanh toán những khoản trễ phí này?`,
            actions: [{
                text: 'Không'
            },
            {
                text: 'Có',
                primary: true,
                action: function () {

                }
            }
            ],
            animation: {
                open: {
                    effects: "fade:in"
                },
                close: {
                    effects: "fade:out"
                }
            }
        }).data("kendoDialog").open();
    })

    $("#tbxTotalMoney").kendoNumericTextBox({
        format: "#,### VND",
        spinners: false
    });

    ddl_CustomerSearchID = $('#tbxCustomerID').kendoDropDownList({
        dataSource: {
            transport: {
                read: {
                    url: urlAPI + "/Customer/getCustomer",
                    dataType: "jsonp"
                }
            }
        },
        width: 250,
        value: "Chọn khách hàng",
        optionLabel: "Chọn khách hàng",
        dataTextField: "customerName",
        dataValueField: "customerID",
        filter: "contains",
        template: '#:customerCode# - #:customerName#',
        filtering: function (e) {
            // ignore space
            var filterValue = e.sender._prev;
            if (filterValue.trim) filterValue = filterValue.trim();
            this.dataSource.filter({
                logic: "or",
                filters: [
                    {
                        field: "customerCode",
                        operator: "contains",
                        value: filterValue
                    },
                    {
                        field: "customerName",
                        operator: "contains",
                        value: filterValue
                    }
                ]
            });

            // important: stop default filter
            e.preventDefault();
        }
    })

    grid_qlpth = $("#grid_qlpth").kendoGrid({
        resizeable: true,
        scrollable: true,
        resizable: true,
        sortable: true,
        navigatable: true,
        width: 'auto',
        selectable: "row",
        toolbar: [
            {
                template:
                    '<button id = "btnDeleteLateCharge" class= "btn-danger k-button k-button-icontext" ><i class="far fa-trash-alt"></i> Xóa</button>'
            },
            //"excel"
        ],
        excel: {
            allPages: true,
            fileName: "DanhSachKhachHang-(" + moment().format("DD-MM-YYYY") + ")",
            filterable: true
        },
        noRecords: {
            template: "<span style='margin: 0 auto;line-height: 50px;'>Không có dữ liệu!</span>"
        },
        filterable: {
            mode: "row"
        },
        change: function (e) {
            var total = 0, totalArr = []
            var rows = e.sender.select();
            rows.each(function (e) {
                var grid = $("#grid").data("kendoGrid");
                var dataItem = grid.dataItem(this);
                totalArr.push(dataItem)
            })

            totalArr.forEach(function (item) {
                total += item.lateFee
            })
            $('#tbxTotalMoney').val(total)
        },
        dataBound: function (e) {
            //click
            $('#btnDeleteLateCharge').unbind('click')
            $(document).on('click', '#btnDeleteLateCharge', function () {

            })

            //hover
            $('#btnUpdateCustomer,#btnUpdateCustomer *').on('mouseover', function () {
                $('[role="row"].k-state-selected').addClass('hoverEdit')
            }).on('mouseout', function () {
                $('[role="row"].k-state-selected').removeClass('hoverEdit')
            })
        },
        columns: [
            {
                selectable: true, width: "50px"
            }, {
                field: "customerCode",
                title: "Đĩa đã thuê",
            }, {
                field: "customerName",
                title: "Hạn trả",
                format: "{0:MM/dd/yyyy}"
            }, {
                field: "customerPhone",
                title: "Ngày trả",
                format: "{0:MM/dd/yyyy}"
            }, {
                field: "customerAddress",
                title: "Phí phạt",
                format: "#,### VND"
            }, {
                field: "customerAddress",
                title: "Trạng thái",
                template: function (e) {
                    if (e.status == "True") {
                        return '<button class="btn btn-outline-success" disabled>Đã thanh toán</button>'
                    } else {
                        return '<button class="btn btn-outline-danger" disabled>Chưa thanh toán</button>'
                    }
                }
            }]
    }).data('kendoGrid');

}

var setup_QLDM_TuaDia = function () {
    var record = 0, grid_qldm_tuadia;

    grid_qldm_tuadia = $("#grid_qldm_tuadia").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    url: urlAPI + "/DiskTitle/getAllDiskTitleForLoad",
                    dataType: "jsonp"
                }
            },
            pageSize: 20
        },
        resizeable: true,
        scrollable: true,
        pageable: true,
        resizable: true,
        sortable: true,
        navigatable: true,
        width: 'auto',
        selectable: "row",
        toolbar: [
            {
                template:
                    '<button id = "btnAddDiskTitle" class= "btn-success k-button k-button-icontext" > <i class="fas fa-plus-circle"></i> Thêm</button>'
            }, {
                template:
                    '<button id = "btnUpdateDiskTitle" class= "btn-warning k-button k-button-icontext" > <i class="fas fa-edit"></i> Chỉnh sửa</button>'
            }, {
                template:
                    '<button id = "btnDeleteDiskTitle" class= "btn-danger k-button k-button-icontext" ><i class="far fa-trash-alt"></i> Xóa</button>'
            }, "excel"
        ],
        excel: {
            allPages: true,
            fileName: "DanhSachTuaDia-(" + moment().format("DD-MM-YYYY") + ")",
            filterable: true
        },
        noRecords: {
            template: "<span style='margin: 0 auto;line-height: 50px;'>Không có dữ liệu!</span>"
        },
        filterable: {
            mode: "row"
        },
        dataBound: function () {
            record = 0

            //click
            $('#btnAddCustomer').unbind('click')
            $(document).on('click', '#btnAddCustomer', function () {
                modalAddCustomer.center().open();
            })

            //hover
            $('#btnUpdateCustomer,#btnUpdateCustomer *').on('mouseover', function () {
                $('[role="row"].k-state-selected').addClass('hoverEdit')
            }).on('mouseout', function () {
                $('[role="row"].k-state-selected').removeClass('hoverEdit')
            })

            $('#btnDeleteCustomer,#btnDeleteCustomer *').on('mouseover', function () {
                $('[role="row"].k-state-selected').addClass('hoverDelete')
            }).on('mouseout', function () {
                $('[role="row"].k-state-selected').removeClass('hoverDelete')
            })
        },
        columns: [{
            template: function () {
                return ++record;
            },
            width: 50,
            title: "STT",
            lockable: false,
            attributes: {
                style: "text-align: center"
            }
        }, {
            field: "diskCode",
            title: "Mã tựa đĩa",
            width: 150,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "diskTitleName",
            title: "Tên tựa đĩa",
            width: 250,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "diskTypeId",
            title: "Thể loại",
            width: 150,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }],
        change: function (e) {
            var rows = e.sender.select();
            rows.each(function (e) {
                var grid = $("#grid").data("kendoGrid");
                var dataItem = grid.dataItem(this);
                $('#tbxCode').val(dataItem.diskCode)
                $('#tbxName').val(dataItem.diskTitleName)
                $('#tbxType').val(dataItem.diskTypeId)
            })
        }
    }).data('kendoGrid');
}