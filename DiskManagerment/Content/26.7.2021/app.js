var urlAPI = 'http://localhost:3000/api'
var diskTypeVarible,
    popupNotification,
    modalAddCustomer,
    modalAddDiskTitle,
    modalAddDisk,
    modalConfigDiskType,
    validatorAddDiskTitle,
    validatorAddDisk,
    validatorConfigDiskType,
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
                        dataType: "json",
                        type: 'post',
                        data: {
                            customerName: $('#tbx_Create_CustomerName').val(),
                            customerAddress: $('#tbx_Create_Address').val(),
                            customerPhone: $('#tbx_Create_Phone').val()
                        },
                        success: function (result) {
                            noti("Thao tác thành công!", "success")
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

                    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                    if (format.test($("#tbx_Create_DiskTitleCode").val())) {
                        noti("Mã không được chứa khoảng trắng hay ký tự đặc biệt!", "warning")
                        return;
                    }
                    $.ajax({
                        url: urlAPI + '/DiskTitle/addDiskTitle',
                        dataType: "json",
                        type: 'post',
                        data: {
                            diskTitleCode: $("#tbx_Create_DiskTitleCode").val().toUpperCase(),
                            diskTitleName: $("#tbx_Create_DiskTitleName").val(),
                            diskTypeId: $('#tbx_Create_DiskTitleType').getKendoDropDownList().value()
                        },
                        success: function (result) {
                            if (result != "success") {
                                noti(result, "error")
                                return
                            }
                            noti("Thao tác thành công!", "success")
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
    modalAddDisk = $("#modalAddDisk").kendoWindow({
        visible: false,
        height: 150,
        width: 425,
        resizeable: false,
        draggable: false,
        modal: true,
        title: "Thêm đĩa",
        open: function (e) {
            validatorAddDisk = $("#formAddDisk").kendoValidator().data('kendoValidator');
            $('#tbx_Create_DiskTitle').kendoDropDownList({
                dataSource: {
                    transport: {
                        read: {
                            url: urlAPI + "/DiskTitle/getAllDiskTitle",
                            dataType: "json"
                        }
                    }
                },
                width: 300,
                value: "Chọn loại đĩa",
                optionLabel: "Chọn loại đĩa",
                dataTextField: "diskTitleName",
                dataValueField: "diskTitleId",
                template: '#:diskTitleCode# - #:diskTitleName#'
            })
            if (!$("#tbx_Create_DiskQuantity").getKendoNumericTextBox()) {
                $("#tbx_Create_DiskQuantity").kendoNumericTextBox({
                    spinners: true,
                    format: "#"
                });
            }

            $('#formAddDisk .btnSaveOrUpdate').unbind('click')
            $("#formAddDisk .btnSaveOrUpdate").bind('click', function (e) {
                e.preventDefault();
                if (validatorAddDisk.validate()) {
                    if (!$('#tbx_Create_DiskTitle').getKendoDropDownList().value() || !$("#tbx_Create_DiskQuantity").getKendoNumericTextBox().value()) {
                        noti("Vui lòng nhập đầy đủ thông tin!", "error")
                        return
                    }
                    
                    $.ajax({
                        url: urlAPI + '/Disk/addDisk',
                        dataType: "json",
                        type: 'post',
                        data: {
                            diskId: "",
                            diskTitleId: $('#tbx_Create_DiskTitle').getKendoDropDownList().value(),
                            diskCode: "",
                            status: "Trên kệ",
                            dateAdd: new Date().toJSON(),
                            quantity: $("#tbx_Create_DiskQuantity").getKendoNumericTextBox().value()
                        },
                        success: function (result) {
                            noti("Thao tác thành công!", "success")
                            refreshGird('#grid_qldm_dia')
                            modalAddDisk.close()
                            $("#formAddDisk .btnResetFeild").click();
                        }
                    })
                } else {
                    noti("Vui lòng nhập đầy đủ thông tin!", "error")
                }
            })
            $("#formAddDisk .btnResetFeild").bind('click', function (e) {
                e.preventDefault();
                resetWindow("formAddDisk", validatorAddDisk)
            })
        }
    }).data("kendoWindow");
    modalConfigDiskType = $("#modalConfigDiskType").kendoWindow({
        visible: false,
        height: 200,
        width: 375,
        resizeable: false,
        draggable: false,
        modal: true,
        title: "Thêm đĩa",
        open: function (e) {
            validatorConfigDiskType = $("#formConfigDiskType").kendoValidator().data('kendoValidator');
            $('#tbx_Config_Type').kendoDropDownList({
                dataSource: {
                    transport: {
                        read: {
                            url: urlAPI + "/DiskType/getAllDiskType",
                            dataType: "json"
                        }
                    },
                    change: function (e) {
                        diskTypeVarible = this.data();
                    }
                },
                width: 300,
                value: "Chọn loại đĩa",
                optionLabel: "Chọn loại đĩa",
                dataTextField: "diskName",
                dataValueField: "diskTypeId",
                template: '#:diskTypeId# - #:diskName#',
                select: function (e) {
                    var item = e.dataItem
                    $("#tbx_Config_Charge").getKendoNumericTextBox().value(item.rentalCharge)
                    $("#tbx_Config_HireDay").getKendoNumericTextBox().value(item.rentalPeriod)
                    $("#tbx_Config_LateFee").getKendoNumericTextBox().value(item.lateFee)
                }
            })

            if (!$("#tbx_Config_HireDay").getKendoNumericTextBox()) {
                $("#tbx_Config_HireDay").kendoNumericTextBox({
                    spinners: true,
                    format: "# ngày",
                    min: 1
                });
                $("#tbx_Config_Charge").kendoNumericTextBox({
                    spinners: true,
                    format: "#,### VND", step: 1000, min: 1000
                });
                $("#tbx_Config_LateFee").kendoNumericTextBox({
                    spinners: true,
                    format: "#,### VND", step: 1000, min: 1000
                });
            }

            $('#formConfigDiskType .btnSaveOrUpdate').unbind('click')
            $("#formConfigDiskType .btnSaveOrUpdate").bind('click', function (e) {
                e.preventDefault();
                if (validatorConfigDiskType.validate()) {
                    if (!$("#tbx_Config_HireDay").getKendoNumericTextBox().value() ||
                        !$("#tbx_Config_Charge").getKendoNumericTextBox().value() ||
                        !$("#tbx_Config_LateFee").getKendoNumericTextBox().value()
                    ) {
                        noti("Vui lòng nhập đầy đủ thông tin!", "error")
                        return
                    }
                    
                    $.ajax({
                        url: urlAPI + '/DiskType/editDiskType',
                        dataType: "json",
                        type: 'post',
                        data: {
                            diskTypeId: $('#tbx_Config_Type').getKendoDropDownList().value(),
                            rentalCharge: $("#tbx_Config_Charge").getKendoNumericTextBox().value(),
                            lateFee: $("#tbx_Config_LateFee").getKendoNumericTextBox().value(),
                            rentalPeriod: $("#tbx_Config_HireDay").getKendoNumericTextBox().value(),
                        },
                        complete: function (result) {
                            noti("Thao tác thành công!", "success")
                        }
                    })
                } else {
                    noti("Vui lòng nhập đầy đủ thông tin!", "error")
                }
            })
            $("#formConfigDiskType .btnResetFeild").bind('click', function (e) {
                e.preventDefault();
                resetWindow("formConfigDiskType", validatorConfigDiskType)
            })
        }
    }).data("kendoWindow");

    //click
    $('.btn_Menu_AddCustomer').unbind('click')
    $(document).on('click', '.btn_Menu_AddCustomer', function () {
        modalAddCustomer.center().open();
    })

    $('.btnDiskTypeManagement').unbind('click')
    $(document).on('click', '.btnDiskTypeManagement', function () {
        modalConfigDiskType.center().open();
    })

    $('.btn_Menu_Logout').unbind('click')
    $(document).on('click', '.btn_Menu_Logout', function () {
        $("#dialog").kendoDialog({
            width: 220,
            height: 110,
            title: "Đăng xuất",
            closable: true,
            modal: true,
            content: `Bạn có muốn đăng xuất?`,
            actions: [{
                text: 'Không'
            },
            {
                text: 'Có',
                primary: true,
                action: function () {
                    location.href = "/Login/Logout"
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
})

$(window).on("resize", function () {
    kendo.resize($(".k-grid"));
});

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

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
                    dataType: "json"
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
        format: "#,### VND", step: 1000, min: 1000,
        spinners: false
    });

    ddl_CustomerSearchID = $('#tbxCustomerID').kendoDropDownList({
        dataSource: {
            transport: {
                read: {
                    url: urlAPI + "/Customer/getCustomer",
                    dataType: "json"
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
                var dataItem = this.dataItem(this);
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
                    url: urlAPI + "/DiskTitle/getAllDiskTitle",
                    dataType: "json"
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
            $('#btnAddDiskTitle').unbind('click')
            $(document).on('click', '#btnAddDiskTitle', function () {
                modalAddDiskTitle.center().open();
            })

            //hover
            $('#btnUpdateDiskTitle,#btnUpdateDiskTitle *').on('mouseover', function () {
                $('[role="row"].k-state-selected').addClass('hoverEdit')
            }).on('mouseout', function () {
                $('[role="row"].k-state-selected').removeClass('hoverEdit')
            })

            $('#btnDeleteDiskTitle,#btnDeleteDiskTitle *').on('mouseover', function () {
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
            field: "diskTitleCode",
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
                var dataItem = grid_qldm_tuadia.dataItem(this);
                $('#tbxCode').val(dataItem.diskTitleCode)
                $('#tbxName').val(dataItem.diskTitleName)
                $('#tbxType').val(dataItem.diskTypeId)
            })
        }
    }).data('kendoGrid');
}

var setup_QLDM_Dia = function () {
    var record = 0, grid_qldm_dia;

    grid_qldm_dia = $("#grid_qldm_dia").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    url: urlAPI + "/Disk/getAllDiskForLoadOnShelf",
                    dataType: "json"
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
                    '<button id = "btnAddDisk" class= "btn-success k-button k-button-icontext" > <i class="fas fa-plus-circle"></i> Thêm</button>'
            }, {
                template:
                    '<button id = "btnUpdateDisk" class= "btn-warning k-button k-button-icontext" > <i class="fas fa-edit"></i> Chỉnh sửa</button>'
            }, {
                template:
                    '<button id = "btnDeleteDisk" class= "btn-danger k-button k-button-icontext" ><i class="far fa-trash-alt"></i> Xóa</button>'
            }, "excel"
        ],
        excel: {
            allPages: true,
            fileName: "DanhSachDia-(" + moment().format("DD-MM-YYYY") + ")",
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
            $('#btnAddDisk').unbind('click')
            $(document).on('click', '#btnAddDisk', function () {
                modalAddDisk.center().open();
            })

            //hover
            $('#btnUpdateDisk,#btnUpdateDisk *').on('mouseover', function () {
                $('[role="row"].k-state-selected').addClass('hoverEdit')
            }).on('mouseout', function () {
                $('[role="row"].k-state-selected').removeClass('hoverEdit')
            })

            $('#btnDeleteDisk,#btnDeleteDisk *').on('mouseover', function () {
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
            field: "Code",
            title: "Mã đĩa",
            width: 150,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "Title",
            title: "Tên tựa đĩa",
            width: 250,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "Type",
            title: "Thể loại",
            width: 150,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "Date",
            title: "Ngày nhập",
            width: 150,
            template: function (e) {
                return moment(e.Date).format('HH:mm - DD/MM/YYYY')
            },
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "Status",
            title: "Trạng thái",
            width: 150,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "Charge",
            title: "Phí phạt",
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
                var dataItem = grid_qldm_dia.dataItem(this);
            })
        }
    }).data('kendoGrid');
}

var setup_QLTD_LPT = function () {
    var record = 0, blockTooltip = true, ddl_ChooseCustomer, tooltip_latecharge, grid_qltd_lapphieuthue_dsdia, grid_qltd_lapphieuthue_dshoadon;

    $("#tbxTotalMoney").kendoNumericTextBox({
        format: "#,### VND", step: 1000, min: 1000,
        spinners: false
    });

    tooltip_latecharge = $("#showCustomerLateCharge").kendoTooltip({
        width: 120,
        position: "top",
        show: function (e) {
            if (blockTooltip) {
                $('#showCustomerLateCharge_tt_active').parent().addClass('hide')
            } else {
                $('#showCustomerLateCharge_tt_active').parent().removeClass('hide')
            }
        }
    }).data("kendoTooltip");

    ddl_ChooseCustomer = $('#tbxChooseCustomer').kendoDropDownList({
        dataSource: {
            transport: {
                read: {
                    url: urlAPI + "/Customer/getCustomer",
                    dataType: "json"
                }
            }
        },
        width: 200,
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
        },
        select: function (e) {
            var dataSeletect = e.dataItem

            if (!dataSeletect.customerID) {
                $('.noti-alert').addClass('hide')
                blockTooltip = true
                return
            }

            $.ajax({
                url: urlAPI + '/LateCharge/getLateChargeByIDCus',
                dataType: "json",
                type: 'post',
                data: {
                    id: dataSeletect.customerID
                },
                success: function (result) {
                    if (result.length > 0) {
                        $('.noti-alert').removeClass('hide')
                        blockTooltip = false

                        var interval = setInterval(function () {
                            if ($('#showCustomerLateCharge').getKendoTooltip().content) {
                                $($('#showCustomerLateCharge').getKendoTooltip().content[0]).text("Khách hàng có " + result.length + " phí trễ hạn chưa thanh toán!")
                                $('#showCustomerLateCharge').getKendoTooltip().show()
                                clearInterval(interval)
                            }
                        }, 50)
                    } else {
                        $('.noti-alert').addClass('hide')
                        blockTooltip = true
                    }
                }
            })
        }
    })

    grid_qltd_lapphieuthue_dsdia = $("#grid_qltd_lapphieuthue_dsdia").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    url: urlAPI + "/Disk/getAllDiskForLoadOnShelf",
                    dataType: "json"
                }
            },
            schema: {
                model: {
                    id: "ID"
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
        persistSelection: true,
        width: 'auto',
        noRecords: {
            template: "<span style='margin: 0 auto;line-height: 50px;'>Không có dữ liệu!</span>"
        },
        filterable: {
            mode: "row"
        },
        dataBound: function () {
            record = 0

            //click
            $('#btnAddDisk').unbind('click')
            $(document).on('click', '#btnAddDisk', function () {
                modalAddDisk.center().open();
            })

            //hover
            $('#btnUpdateDisk,#btnUpdateDisk *').on('mouseover', function () {
                $('[role="row"].k-state-selected').addClass('hoverEdit')
            }).on('mouseout', function () {
                $('[role="row"].k-state-selected').removeClass('hoverEdit')
            })

            $('#btnDeleteDisk,#btnDeleteDisk *').on('mouseover', function () {
                $('[role="row"].k-state-selected').addClass('hoverDelete')
            }).on('mouseout', function () {
                $('[role="row"].k-state-selected').removeClass('hoverDelete')
            })
        },
        columns: [
            { selectable: true, width: "40px" }, {
            field: "Code",
            title: "Mã đĩa",
            width: 100,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "Title",
            title: "Tên tựa đĩa",
            width: 250,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "Type",
            title: "Thể loại",
            width: 150,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "Date",
            title: "Ngày nhập",
            width: 150,
            template: function (e) {
                return moment(e.Date).format('HH:mm - DD/MM/YYYY')
            },
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "Status",
            title: "Trạng thái",
            width: 150,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "Charge",
            title: "Phí thuê",
            width: 150,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
            }
        ],
        change: function (e) {
            var sum = 0;
            grid_qltd_lapphieuthue_dshoadon.dataSource.data([])
            this.selectedKeyNames().forEach(function (item) {
                grid_qltd_lapphieuthue_dshoadon.dataSource.add(
                    grid_qltd_lapphieuthue_dsdia.dataSource.get(item)
                )
                sum += grid_qltd_lapphieuthue_dsdia.dataSource.get(item).
            })
        }
    }).data('kendoGrid');

    grid_qltd_lapphieuthue_dshoadon = $("#grid_qltd_lapphieuthue_dshoadon").kendoGrid({
        resizeable: true,
        scrollable: true,
        resizable: true,
        sortable: true,
        navigatable: true,
        width: 'auto',
        height: 'calc(100% - 100px)',
        selectable: "row",
        dataBound: function () {
            record = 0

            //click
            $('#btnAddDisk').unbind('click')
            $(document).on('click', '#btnAddDisk', function () {
                modalAddDisk.center().open();
            })

            //hover
            $('#btnUpdateDisk,#btnUpdateDisk *').on('mouseover', function () {
                $('[role="row"].k-state-selected').addClass('hoverEdit')
            }).on('mouseout', function () {
                $('[role="row"].k-state-selected').removeClass('hoverEdit')
            })

            $('#btnDeleteDisk,#btnDeleteDisk *').on('mouseover', function () {
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
            field: "Code",
            title: "Mã đĩa",
            width: 100,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "Title",
            title: "Tên tựa đĩa",
            width: 250,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "Charge",
            title: "Phí thuê",
            width: 100,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }],
        change: function (e) {
        }
    }).data('kendoGrid');
}

function setup_QLTD_TraDia() {
    var grid_qltd_TraDia;

    grid_qltd_TraDia = $("#grid_qltd_TraDia").kendoGrid({
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
                var dataItem = this.dataItem(this);
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