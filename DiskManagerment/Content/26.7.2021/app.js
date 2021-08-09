var urlAPI = 'http://localhost:3000/api'
var diskTypeVarible,
    popupNotification,
    modalAddCustomer,
    modalAddCustomer_IsEdit = false,
    modalAddDiskTitle,
    modalAddDiskTitle_IsEdit = false,
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
            $("#modalAddCustomer .btnSaveOrUpdate").unbind('click')
            $("#modalAddCustomer .btnSaveOrUpdate").bind('click', function (e) {
                e.preventDefault();
                if (validatorAddCustomer.validate()) {
                    if (!modalAddCustomer_IsEdit) {
                        $.ajax({
                            url: urlAPI + '/Customer/addCustomer',
                            dataType: "json",
                            type: 'post',
                            data: {
                                customerName: $('#tbx_Create_CustomerName').val(),
                                customerAddress: $('#tbx_Create_Address').val(),
                                customerPhone: $('#tbx_Create_Phone').val()
                            },
                            complete: function (result) {
                                
                                noti("Thao tác thành công!", "success")
                                refreshGird('#grid_qlkh')
                                modalAddCustomer.close()
                                $("#modalAddCustomer .btnResetFeild").click();
                            }
                        })
                    } else {
                        var grid_qlkh = $("#grid_qlkh").getKendoGrid()
                        $.ajax({
                            url: urlAPI + '/Customer/editCustomer',
                            dataType: "json",
                            type: 'post',
                            data: {
                                customerID: grid_qlkh.dataItem(grid_qlkh.select()).customerID,
                                customerName: $('#tbx_Create_CustomerName').val(),
                                customerAddress: $('#tbx_Create_Address').val(),
                                customerPhone: $('#tbx_Create_Phone').val()
                            },
                            complete: function (result) {
                               
                                noti("Thao tác thành công!", "success")
                                refreshGird('#grid_qlkh')
                                modalAddCustomer.close()
                                $("#modalAddCustomer .btnResetFeild").click();
                            }
                        })
                    }
                } else {
                    noti("Vui lòng nhập đầy đủ thông tin!", "error")
                }
            })
            $("#modalAddCustomer .btnResetFeild").unbind('click')
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
            $('#modalAddDiskTitle .btnSaveOrUpdate').unbind('click')
            $("#modalAddDiskTitle .btnSaveOrUpdate").bind('click', function (e) {
                e.preventDefault();
                if (validatorAddDiskTitle.validate()) {
                    if (!modalAddDiskTitle_IsEdit) {
                        if (!$('#tbx_Create_DiskTitleType').getKendoDropDownList().value()) {
                            noti("Vui lòng nhập đầy đủ thông tin!", "error")
                            return
                        }

                        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                        if (format.test($("#tbx_Create_DiskTitleCode").val())) {
                            noti("Mã không được chứa khoảng trắng hay ký tự đặc biệt!", "warning")
                            return;
                        }
                        $("#tbx_Create_DiskTitleCode").prop('readonly', false)
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
                                noti("Thao tác thành công!", "success")
                                refreshGird('#grid_qldm_tuadia')
                                modalAddDiskTitle.close()
                                $("#formAddDiskTitle .btnResetFeild").click();
                            }
                        })
                    } else {
                        var grid_qldm_tuadia = $("#grid_qldm_tuadia").getKendoGrid()
                        $("#tbx_Create_DiskTitleCode").prop('readonly', true)
                        $.ajax({
                            url: urlAPI + '/DiskTitle/editDiskTitle',
                            dataType: "json",
                            type: 'post',
                            data: {
                                diskTitleId: grid_qldm_tuadia.dataItem(grid_qldm_tuadia.select()).diskTitleId,
                                diskTitleCode: $("#tbx_Create_DiskTitleCode").val().toUpperCase(),
                                diskTitleName: $("#tbx_Create_DiskTitleName").val(),
                                diskTypeId: $('#tbx_Create_DiskTitleType').getKendoDropDownList().value()
                            },
                            complete: function (result) {
                                noti("Thao tác thành công!", "success")
                                refreshGird('#grid_qldm_tuadia')
                                modalAddDiskTitle.close()
                                $("#formAddDiskTitle .btnResetFeild").click();
                            }
                        })
                    }
                } else {
                    noti("Vui lòng nhập đầy đủ thông tin!", "error")
                }
            })
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
            $("#modalAddDiskTitle .btnResetFeild").unbind('click')
            $("#modalAddDiskTitle .btnResetFeild").bind('click', function (e) {
                e.preventDefault();
                resetWindow("modalAddDiskTitle", validatorAddDiskTitle)
            })
        }
    }).data("kendoWindow");
    modalAddDisk = $("#modalAddDisk").kendoWindow({
        visible: false,
        height: 150,
        width: 435,
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
                            $.ajax({
                                url: urlAPI + '/Reservation/setOnHold',
                                dataType: "json",
                                type: 'post',
                                data: {
                                    title: $('#tbx_Create_DiskTitle').getKendoDropDownList().text(),
                                    diskID: result.diskId
                                },
                                success: function (result_) {
                                    if (result_ == true) {
                                        $.ajax({
                                            url: urlAPI + '/Disk/setStatus',
                                            dataType: "json",
                                            type: 'post',
                                            data: {
                                                id: result.diskId,
                                                status: "Đang chờ"
                                            },
                                            complete: function () {
                                                refreshGird('#grid_qldm_dia')
                                            }
                                        })
                                    }
                                }
                            })
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
            $("#formAddDisk .btnResetFeild").unbind('click')
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
                            $('.k-grid').each(function (id,item) {
                                refreshGird(item)
                            })
                            if ($('#grid_qltd_lapphieuthue_dshoadon').getKendoGrid())
                                $('#grid_qltd_lapphieuthue_dshoadon').getKendoGrid().dataSource.data([])
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
        },
        close: function () {
            resetWindow("formConfigDiskType", validatorConfigDiskType)
        }
    }).data("kendoWindow");

    //click
    $('.btn_Menu_AddCustomer').unbind('click')
    $('.btn_Menu_AddCustomer').click(function () {
        modalAddCustomer.center().open();
    })

    $('.btnDiskTypeManagement').unbind('click')
    $('.btnDiskTypeManagement').click(function () {
        modalConfigDiskType.center().open();
    })

    $('.btn_Menu_Logout').unbind('click')
    $('.btn_Menu_Logout').click(function () {
        $("#dialog").kendoDialog({
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

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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
            fileName: "DanhSachKhachHang[" + moment().format("HH:mm DD-MM-YYYY") + "]",
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
            $('#btnAddCustomer').click(function () {
                modalAddCustomer_IsEdit = false;
                modalAddCustomer.center().open();
            })
            $('#btnUpdateCustomer').unbind('click')
            $('#btnUpdateCustomer').click(function () {
                var sltID = grid_qlkh.dataItem(grid_qlkh.select())
                modalAddCustomer_IsEdit = true;

                if (!sltID) {
                    noti("Vui lòng chọn một khách hàng!", "warning")
                    return
                }

                $.ajax({
                    url: urlAPI + '/Customer/findCustomer',
                    dataType: "json",
                    type: 'post',
                    data: {
                        id: sltID.customerID
                    },
                    success: function (result) {
                        $('#tbx_Create_CustomerName').val(result.customerName)
                        $('#tbx_Create_Phone').val(result.customerPhone)
                        $('#tbx_Create_Address').val(result.customerAddress)

                        modalAddCustomer.center().open();
                    }
                })
            })

            $('#btnDeleteCustomer').unbind('click')

            $('#btnDeleteCustomer').click(function() {
                var sltID = grid_qlkh.dataItem(grid_qlkh.select())
                modalAddCustomer_IsEdit = true;

                if (!sltID) {
                    noti("Vui lòng chọn một khách hàng!", "warning")
                    return
                }

                $("#dialog").kendoDialog({
                    title: "Thông báo",
                    closable: true,
                    modal: true,
                    content: `Bạn có muốn xóa khách hàng này?`,
                    actions: [{
                        text: 'Không'
                    },
                    {
                        text: 'Có',
                        primary: true,
                        action: function () {
                            $.ajax({
                                url: urlAPI + '/Customer/deleteCustomer',
                                dataType: "json",
                                type: 'post',
                                data: {
                                    id: sltID.customerID
                                },
                                success: function (result) {
                                    noti("Thao tác thành công!", "success")
                                    grid_qlkh.dataSource.read()
                                }
                            })
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
                field: "ID",
                title: "Mã đĩa",
                filterable: {
                    cell: {
                        operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            }, {
                field: "DiskName",
                title: "Tựa đĩa",
                filterable: {
                    cell: {
                        operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            }, {
                field: "HireDate",
                title: "Ngày thuê",
                filterable: {
                    cell: {
                        operator: "contains",
                        suggestionOperator: "contains"
                    }
                },
                template: function (e) {
                    return moment(e.HireDate).format('HH:mm - DD/MM/YYYY')
                },
            }, {
                field: "PaymentTerm",
                title: "Hạn trả",
                filterable: {
                    cell: {
                        operator: "contains",
                        suggestionOperator: "contains"
                    }
                },
                template: function (e) {
                    return moment(e.PaymentTerm).format('HH:mm - DD/MM/YYYY')
                },
            }]
    }).data('kendoGrid');
}

var setup_QLPTH = function () {
    var grid_qlpth, ddl_CustomerSearchID;
    $('#btnPayment').click(function (e) {
        e.preventDefault();
        if (!$('#tbxTotalMoney').val()) {
            noti("Bạn chưa chọn khoản trễ nào!", "warning")
            return;
        }
        $("#dialog").kendoDialog({
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
                    var addCount = 0
                    grid_qlpth.selectedKeyNames().forEach(function (item) {
                        var dataItem = grid_qlpth.dataSource.get(item)
                        $.ajax({
                            url: urlAPI + '/RentalBill/setPayStatus',
                            dataType: "json",
                            type: 'post',
                            data: {
                                id: dataItem.ID
                            },
                            complete: function () {
                                addCount++
                            }
                        })
                    })
                    var syncInterval = setInterval(function () {
                        if (addCount == grid_qlpth.selectedKeyNames().length) {
                            clearInterval(syncInterval)
                            noti("Thao tác thành công!", "success")
                            $('thead [data-role="checkbox"]').click().click()
                            refreshGird('#grid_qlpth')
                        }
                    }, 100)
                }
            }],
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
        format: "#,### VND", step: 1000, value: 0,
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
        },
        select: function (e) {
            var dataSeletect = e.dataItem

            var initDs = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: urlAPI + "/RentalBill/getAllLateChargeByIDCus",
                        type: "post",
                        dataType: "json",
                        data: {
                            id: dataSeletect.customerID
                        }
                    }
                },
                schema: {
                    model: {
                        id: "ID"
                    }
                }
            })
            grid_qlpth.setDataSource(initDs)
        }
    }).data('kendoDropDownList')

    grid_qlpth = $("#grid_qlpth").kendoGrid({
        resizeable: true,
        scrollable: true,
        resizable: true,
        sortable: true,
        navigatable: true,
        width: 'auto',
        persistSelection: true,
        toolbar: [
            {
                template:
                    '<button id = "btnDeleteLateCharge" class= "btn-danger k-button k-button-icontext" ><i class="far fa-trash-alt"></i> Xóa</button>'
            },
            //"excel"
        ],
        excel: {
            allPages: true,
            fileName: "DanhSachKhachHang[" + moment().format("HH:mm DD-MM-YYYY") + "]",
            filterable: true
        },
        noRecords: {
            template: "<span style='margin: 0 auto;line-height: 50px;'>Không có dữ liệu!</span>"
        },
        filterable: {
            mode: "row"
        },
        change: function (e) {
            var sum = 0;
            $('#tbxTotalMoney').getKendoNumericTextBox().value(0)
            this.selectedKeyNames().forEach(function (item) {
                sum += grid_qlpth.dataSource.get(item).Fee
            })
            $('#tbxTotalMoney').getKendoNumericTextBox().value(sum)
        },
        dataBound: function (e) {
            //click
            $('#btnDeleteLateCharge').unbind('click')
            $('#btnDeleteLateCharge').click(function () {

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
                field: "DiskRent",
                title: "Đĩa đã thuê",
            }, {
                field: "HireDate",
                title: "Hạn trả",
                template: function (e) {
                    return moment(e.HireDate).format('HH:mm - DD/MM/YYYY')
                }
            }, {
                field: "PayDate",
                title: "Ngày trả",
                template: function (e) {
                    return moment(e.PayDate).format('HH:mm - DD/MM/YYYY')
                }
            }, {
                field: "Fee",
                title: "Phí phạt",
                template: function (e) {
                    return kendo.toString(e.Fee, "#,### VND")
                }
            }, {
                field: "Status",
                title: "Trạng thái",
                template: function (e) {
                    if (e.Status == true) {
                        return '<button class="btn btn-outline-success" disabled>Đã thanh toán</button>'
                    } else {
                        return '<button class="btn btn-outline-danger" disabled>Chưa thanh toán</button>'
                    }
                }
            }]
    }).data('kendoGrid');

    if (getParameterByName("id")) {
        ddl_CustomerSearchID.value(getParameterByName("id"));

        var initDs = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlAPI + "/RentalBill/getAllLateChargeByIDCus",
                    type: "post",
                    dataType: "json",
                    data: {
                        id: getParameterByName("id")
                    }
                }
            },
            schema: {
                model: {
                    id: "ID"
                }
            }
        })
        grid_qlpth.setDataSource(initDs)
    }
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
            fileName: "DanhSachTuaDia[" + moment().format("HH:mm DD-MM-YYYY") + "]",
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
            $('#btnAddDiskTitle').click(function () {
                modalAddDiskTitle_IsEdit = false;
                modalAddDiskTitle.center().open();
            })

            $('#btnUpdateDiskTitle').unbind('click')
            $('#btnUpdateDiskTitle').click(function () {
                var selectedID = grid_qldm_tuadia.dataItem(grid_qldm_tuadia.select())
                modalAddDiskTitle_IsEdit = true;

                if (!selectedID) {
                    noti("Vui lòng chọn một tựa đĩa!", "warning")
                    return
                }

                $.ajax({
                    url: urlAPI + '/DiskTitle/findDiskTitle',
                    dataType: "json",
                    type: 'post',
                    data: {
                        id: selectedID.diskTitleId
                    },
                    success: function (result) {
                        setTimeout(function () {
                            $('#tbx_Create_DiskTitleName').val(result.diskTitleName)
                            $('#tbx_Create_DiskTitleType').getKendoDropDownList().value(result.diskTypeId)
                            $('#tbx_Create_DiskTitleCode').val(result.diskTitleCode)
                        },100)

                        modalAddDiskTitle.center().open();
                    }
                })
            })

            $('#btnDeleteDiskTitle').unbind('click')

            $('#btnDeleteDiskTitle').click(function () {
                var sltID = grid_qldm_tuadia.dataItem(grid_qldm_tuadia.select())
                modalAddDiskTitle_IsEdit = true;

                if (!sltID) {
                    noti("Vui lòng chọn một khách hàng!", "warning")
                    return
                }

                $("#dialog").kendoDialog({
                    title: "Thông báo",
                    closable: true,
                    modal: true,
                    content: `Bạn có muốn xóa tựa đĩa này?`,
                    actions: [{
                        text: 'Không'
                    },
                    {
                        text: 'Có',
                        primary: true,
                        action: function () {
                            $.ajax({
                                url: urlAPI + '/DiskTitle/deleteDiskTitle',
                                dataType: "json",
                                type: 'post',
                                data: {
                                    e: sltID.diskTitleId
                                },
                                success: function (result) {
                                    noti("Thao tác thành công!", "success")
                                    grid_qldm_tuadia.dataSource.read()
                                }
                            })
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
                    url: urlAPI + "/Disk/getAllDiskForLoad",
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
                    '<button id = "btnDeleteDisk" class= "btn-danger k-button k-button-icontext" ><i class="far fa-trash-alt"></i> Xóa</button>'
            }, "excel"
        ],
        excel: {
            allPages: true,
            fileName: "DanhSachDia[" + moment().format("HH:mm DD-MM-YYYY") + "]",
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
            $('#btnAddDisk').click(function () {
                modalAddDisk.center().open();
            })

            $('#btnDeleteDisk').unbind('click')

            $('#btnDeleteDisk').click(function () {
                var sltID = grid_qldm_dia.dataItem(grid_qldm_dia.select())
               

                if (!sltID) {
                    noti("Vui lòng chọn một đĩa!", "warning")
                    return
                }

                $("#dialog").kendoDialog({
                    title: "Thông báo",
                    closable: true,
                    modal: true,
                    content: `Bạn có muốn xóa đĩa này?`,
                    actions: [{
                        text: 'Không'
                    },
                    {
                        text: 'Có',
                        primary: true,
                        action: function () {
                            $.ajax({
                                url: urlAPI + '/Disk/deleteDisk',
                                dataType: "json",
                                type: 'post',
                                data: {
                                    e: sltID.ID
                                },
                                success: function (result) {
                                    noti("Thao tác thành công!", "success")
                                    grid_qldm_dia.dataSource.read()
                                }
                            })
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

            //hover
           

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
    var record = 0, blockTooltip = true, blockTooltip_Hold = true, ddl_ChooseCustomer, tooltip_latecharge, tooltip_onhold, grid_qltd_lapphieuthue_dsdia, grid_qltd_lapphieuthue_dshoadon;

    $("#tbxTotalMoney").kendoNumericTextBox({
        format: "#,### VND", step: 1000,
        spinners: false,
        value: 0
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
    tooltip_onhold = $("#showCustomerOnHold").kendoTooltip({
        width: 120,
        position: "top",
        show: function (e) {
            if (blockTooltip_Hold) {
                $('#showCustomerOnHold_tt_active').parent().addClass('hide')
            } else {
                $('#showCustomerOnHold_tt_active').parent().removeClass('hide')
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
        width: 240,
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
                blockTooltip = true
                return
            }

            $('#showCustomerLateCharge').attr("disabled",true).removeClass('btn-danger')
            $('#showCustomerOnHold').attr("disabled", true).removeClass('btn-danger')

            $.ajax({
                url: urlAPI + '/RentalBill/getLateChargeByIDCus',
                dataType: "json",
                type: 'post',
                data: {
                    id: dataSeletect.customerID
                },
                success: function (result) {
                    if (result.length > 0) {
                        $('#showCustomerLateCharge').attr("disabled", false).addClass('btn-danger')
                        blockTooltip = false

                        var interval = setInterval(function () {
                            if (tooltip_latecharge.content) {
                                clearInterval(interval)
                                $(tooltip_latecharge.content[0]).text("Khách hàng có " + result.length + " phí trễ hạn chưa thanh toán!")
                            }
                        }, 50)

                        $('#showCustomerLateCharge').unbind('click')
                        $('#showCustomerLateCharge').bind('click', function (e) {
                            var strWindowFeatures = "location=no,height=500,width=700,scrollbars=no,status=no,left=418px;top=50px";
                            var URL = "/QuanLyPhiTreHan?id=" + dataSeletect.customerID;
                            window.open(URL, "_blank", strWindowFeatures).focus();

                        })
                    } else {
                        $('#showCustomerLateCharge').attr("disabled", true).removeClass('btn-danger')
                        blockTooltip = true
                    }
                }
            })
            $.ajax({
                url: urlAPI + '/Reservation/getDiskOnHod',
                dataType: "json",
                type: 'post',
                data: {
                    id: dataSeletect.customerID
                },
                success: function (result) {
                    if (result.length > 0) {
                        $('#showCustomerOnHold').attr("disabled", false).addClass('btn-danger')
                        blockTooltip_Hold = false

                        var interval = setInterval(function () {
                            if (tooltip_onhold.content) {
                                clearInterval(interval)
                                $(tooltip_onhold.content[0]).text("Hiện có " + result.length + " đĩa khách hàng đã đặt đang khả dụng!")
                            }
                        }, 50)
                    } else {
                        $('#showCustomerOnHold').attr("disabled", true).removeClass('btn-danger')
                        blockTooltip_Hold = true
                    }
                }
            })
        }
    }).data('kendoDropDownList')

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
            $('#tbxTotalMoney').getKendoNumericTextBox().value(0)
            grid_qltd_lapphieuthue_dshoadon.dataSource.data([])
            this.selectedKeyNames().forEach(function (item) {
                grid_qltd_lapphieuthue_dshoadon.dataSource.add(
                    JSON.parse(JSON.stringify(grid_qltd_lapphieuthue_dsdia.dataSource.get(item)))
                )
                sum += grid_qltd_lapphieuthue_dsdia.dataSource.get(item).Charge
            })
            $('#tbxTotalMoney').getKendoNumericTextBox().value(sum)
        }
    }).data('kendoGrid');

    grid_qltd_lapphieuthue_dshoadon = $("#grid_qltd_lapphieuthue_dshoadon").kendoGrid({
        resizeable: true,
        scrollable: true,
        resizable: true,
        sortable: true,
        navigatable: true,
        width: 'auto',
        height: 'calc(100% - 130px)',
        selectable: "row",
        dataBound: function () {
            record = 0

            //click
            $('#btnAddDisk').unbind('click')
            $('#btnAddDisk').click(function () {
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

    $('#btnPayment').unbind('click')
    $(document).on('click', '#btnPayment', function () {
        var addCount = 0, disks = JSON.parse(JSON.stringify(grid_qltd_lapphieuthue_dshoadon.dataSource.data()))
        var cusID = ddl_ChooseCustomer.value()

        if (!cusID) {
            noti("Vui lòng chọn một khách hàng!", "warning")
            return
        }

        disks.forEach(function (item) {
            $.ajax({
                url: urlAPI + '/RentalBill/addRentalBill',
                dataType: "json",
                type: 'post',
                data: {
                    diskId: item.ID,
                    customerID: ddl_ChooseCustomer.value(),
                    hireDate: new Date().toJSON(),
                    paymentTerm: moment().add('day', item.RentalPeriod).toDate().toJSON(),
                    payDate: "",
                    lateFee: 0,
                    status: false,
                },
                complete: function (result) {
                    $.ajax({
                        url: urlAPI + '/Disk/setStatus',
                        dataType: "json",
                        type: 'post',
                        data: {
                            id: item.ID,
                            status: "Cho thuê"
                        }
                    })
                    addCount++
                }
            })
        })
        var syncInterval = setInterval(function () {
            if (addCount == disks.length) {
                clearInterval(syncInterval)
                noti("Thao tác thành công!", "success")
                refreshGird('#grid_qltd_lapphieuthue_dsdia')
                ddl_ChooseCustomer.value("")
                grid_qltd_lapphieuthue_dshoadon.dataSource.data([])
                $('thead [data-role="checkbox"]').click().click()
            }
        }, 100)
    })
}

function setup_QLTD_TraDia() {
    var grid_qltd_TraDia;

    grid_qltd_TraDia = $("#grid_qltd_TraDia").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    url: urlAPI + "/RentalBill/getRentalBillDetail",
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
        resizable: true,
        sortable: true,
        navigatable: true,
        width: 'auto',
        toolbar: [
            {
                template:
                    '<button id = "btnConfirmReturn" class= "btn-info k-button k-button-icontext" ><i class="far fa-check"></i> Xác nhận trả đĩa</button>'
            },
            {
                template:
                    '<button id = "btnDeleteLateCharge" class= "btn-danger k-button k-button-icontext" ><i class="far fa-trash-alt"></i> Xóa</button>'
            }
            //"excel"
        ],
        persistSelection: true,
        excel: {
            allPages: true,
            fileName: "DanhSachKhachHang[" + moment().format("HH-mm DD-MM-YYYY") + "]",
            filterable: true
        },
        noRecords: {
            template: "<span style='margin: 0 auto;line-height: 50px;'>Không có dữ liệu!</span>"
        },
        filterable: {
            mode: "row"
        },
        change: function (e) {
        },
        dataBound: function (e) {
            //click
            $('#btnDeleteLateCharge').unbind('click')
            $('#btnDeleteLateCharge').click(function () {

            })

            $('#btnConfirmReturn').unbind('click')
            $('#btnConfirmReturn').click(function () {
                var addCount = 0, sltID = $('#grid_qltd_TraDia').getKendoGrid().selectedKeyNames()

                sltID.forEach(function (item) {
                    var currDataItem = grid_qltd_TraDia.dataSource.get(item)
                    $.ajax({
                        url: urlAPI + '/Reservation/setOnHold',
                        dataType: "json",
                        type: 'post',
                        data: {
                            title: currDataItem.DiskName,
                            diskID: currDataItem.ID
                        },
                        success: function (e) {
                            $.ajax({
                                url: urlAPI + '/Disk/setStatus',
                                dataType: "json",
                                type: 'post',
                                data: {
                                    id: currDataItem.ID,
                                    status: e==true?"Đang chờ":"Trên kệ"
                                }
                            })
                            $.ajax({
                                url: urlAPI + '/RentalBill/setPayDate',
                                dataType: "json",
                                type: 'post',
                                data: {
                                    id: currDataItem.IDBill,
                                    fee: currDataItem.Fee
                                }
                            })
                            addCount++
                        }
                    })
                })

                var syncInterval = setInterval(function () {
                    if (addCount == sltID.length) {
                        clearInterval(syncInterval)
                        noti("Thao tác thành công!", "success")
                        $('thead [data-role="checkbox"]').click().click()
                        refreshGird('#grid_qltd_TraDia')
                    }
                }, 100)
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
                field: "DiskCode",
                title: "Mã đĩa",
            }, {
                field: "DiskName",
                title: "Tựa đĩa",
            }, {
                field: "Status",
                title: "Trạng thái",
                template: function (e) {
                    if (e.status == "True") {
                        return '<button class="btn btn-outline-success" disabled>Trên kệ</button>'
                    } else {
                        return '<button class="btn btn-outline-danger" disabled>Đang thuê</button>'
                    }
                }
            }, {
                field: "CustomerName",
                title: "Khách hàng thuê"
            }, {
                field: "HireDate",
                title: "Ngày thuê",
                template: function (e) {
                    return moment(e.HireDate).format('HH:mm - DD/MM/YYYY')
                },
            }, {
                field: "PaymentTerm",
                title: "Hạn thuê",
                template: function (e) {
                    return moment(e.PaymentTerm).format('HH:mm - DD/MM/YYYY')
                },
            }]
    }).data('kendoGrid');
}

var setup_QLTD_DatDia = function () {
    var record = 0, ddl_ChooseCustomer, grid_qltd_datdia_dstuadia, grid_qltd_datdia_dskh;
    var sltTitleID

    $("#tbxTotalMoney").kendoNumericTextBox({
        format: "#,### VND", step: 1000,
        spinners: false,
        value: 0
    });

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
            
        }
    }).data('kendoDropDownList')

    grid_qltd_datdia_dstuadia = $("#grid_qltd_datdia_dstuadia").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    url: urlAPI + "/DiskTitle/getAllDiskTitleForLoad",
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
        height: 'calc(100% - 50px)',
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
        },
        columns: [
            {
                selectable: true, width: "40px",
                headerTemplate: ' '
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
                field: "Name",
                title: "Tên tựa đĩa",
                width: 250,
                filterable: {
                    cell: {
                        operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            }, {
                field: "NameType",
                title: "Thể loại",
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
            sltTitleID = this.selectedKeyNames()
            if (sltTitleID.length == 0) {
                return;
            }
            var initDs = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: urlAPI + "/Reservation/getAllCustomerReservations",
                        dataType: "json",
                        type: 'post',
                        data: {
                            id: sltTitleID[0]
                        }
                    }
                },
                change: function (e) {

                }
            })
            grid_qltd_datdia_dskh.setDataSource(initDs)
        }
    }).data('kendoGrid');

    grid_qltd_datdia_dstuadia.tbody.on("click", ".k-checkbox", function (e) {
        var row = $(e.target).closest("tr");

        if (row.hasClass("k-state-selected")) {
            setTimeout(function (e) {
                grid_qltd_datdia_dstuadia.clearSelection();
            })
        } else {
            grid_qltd_datdia_dstuadia.clearSelection();
        };
    })

    grid_qltd_datdia_dskh = $("#grid_qltd_datdia_dskh").kendoGrid({
        resizeable: true,
        scrollable: true,
        resizable: true,
        sortable: true,
        navigatable: true,
        width: 'auto',
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
            title: "Mã KH",
            width: 80,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "CusName",
            title: "Tên khách hàng",
            width: 200,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            }
        }, {
            field: "DateOrder",
            title: "Ngày đặt",
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            },
            template: function (e) {
                return moment(e.DateOrder).format('HH:mm - DD/MM/YYYY')
            },
        }, {
            field: "DiskID",
            title: "Trạng thái",
            width: 100,
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
                },
                template: function (e) {
                    if (e.DiskID) {
                        return "<a class='k-button btn btn-outline-warning'>Đang chờ</a>"
                    } else {
                        return ""
                    }
                }
        }],
        change: function (e) {
        }
    }).data('kendoGrid');

    $('#btnSet').unbind('click')
    $(document).on('click', '#btnSet', function (e) {
        e.preventDefault()
        if (!sltTitleID) {
            noti("Bạn chưa chọn tựa đĩa để đặt!", "error")
            return
        }
        if (!ddl_ChooseCustomer.value()) {
            noti("Bạn chưa chọn khách hàng để đặt!", "error")
            return
        }
        $.ajax({
            url: urlAPI + '/Reservation/addReservation',
            dataType: "json",
            type: 'post',
            data: {
                diskTitleId: sltTitleID,
                customerID: ddl_ChooseCustomer.value(),
                dateOrder: new Date().toJSON()
            },
            complete: function (e) {
                noti('Đặt trước cho khách hàng thành công!', "success")
                refreshGird("#grid_qltd_datdia_dstuadia")
                grid_qltd_datdia_dskh.dataSource.data([])
                ddl_ChooseCustomer.value("")
            }
        })
    })
}