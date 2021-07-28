using Entities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class AddData
    {
        //Loại đĩa
        public static List<DiskType> GetDiskTypes()
        {
            List<DiskType> eDiskTitles = new List<DiskType>()
            {
                new DiskType()
                {
                   diskTypeId = "GAMES",
                   diskName = "Đĩa game",
                   rentalCharge = 20000,
                   lateFee = 2000,
                   rentalPeriod = 7
                },
                new DiskType()
                {
                   diskTypeId = "MOVIES",
                   diskName = "Đĩa phim",
                   rentalCharge = 15000,
                     lateFee = 1500,
                   rentalPeriod = 10
                },

            };
            return eDiskTitles;
        }

        //Tựa đĩa
        public static List<DiskTitle> GetDiskTitles()
        {
            List<DiskTitle> eDiskTitles = new List<DiskTitle>()
            {
                //Tựa đề phim
                new DiskTitle()
                {
                   diskTitleName = "The Shawshank Redemption",
                   diskTypeId = "MOVIES",
                   diskCode = "MV1"
                },
                new DiskTitle()
                {
                   diskTitleName = "The Godfather",
                   diskTypeId = "MOVIES",
                   diskCode = "MV2"
                },

                //Tựa game
                new DiskTitle()
                {
                   diskTitleName = "Call of Duty",
                   diskTypeId = "GAMES",
                   diskCode = "GM1"
                },
                new DiskTitle()
                {
                   diskTitleName = "Half-Life 2",
                   diskTypeId = "GAMES",
                   diskCode = "GM2"
                }
            };
            return eDiskTitles;
        }

        public static List<Customer> GetCustomer()
        {
            List<Customer> eCustomers = new List<Customer>()
            {
                new Customer()
                {
                    customerID = Guid.NewGuid(),
                   customerCode = "KH001",
                   customerName = "Võ Tuấn Phương",
                   customerAddress = "311/Bùi Thị Xuân - TP.Phan Thiết - Tỉnh Bình Thuận",
                   customerPhone = "0984544711"
                },
                new Customer()
                {
                    customerID = Guid.NewGuid(),
                   customerCode = "KH002",
                   customerName = "Bùi Đức Thiện",
                   customerAddress = "1/Ngô Quyền - TP.Cam Ranh - Tỉnh Khánh Hòa",
                   customerPhone = "0984544711"
                },
                new Customer()
                {
                    customerID = Guid.NewGuid(),
                   customerCode = "KH003",
                   customerName = "Nguyễn Vĩnh Long Vinh",
                   customerAddress = "5/Phạm Văn Đồng - Q.Thủ Đức - TP.Hồ Chí Minh",
                   customerPhone = "0984544711"
                },
                new Customer()
                {
                    customerID = Guid.NewGuid(),

                   customerName = "Phan Trọng Hinh",
                   customerCode = "KH004",
                   customerAddress = "1/Lê Thánh Tôn - Q.Tân Bình - TP.Hồ Chí Minh",
                   customerPhone = "0984544711"
                },
            };
            return eCustomers;
        }

        //Đĩa
        //public static List<eDisk> GetDisks()
        //{
        //    List<eDisk> eDisks = new List<eDisk>()
        //    {
        //        new eDisk()
        //        {
        //           status = "Trên kệ",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 1
        //        },
        //        new eDisk()
        //        {
        //           status = "Trên kệ",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 2
        //        },
        //        new eDisk()
        //        {
        //           status = "Cho thuê",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 3
        //        },
        //        new eDisk()
        //        {
        //           status = "Trên kệ",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 4
        //        },
        //        new eDisk()
        //        {
        //           status = "Cho thuê",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 5
        //        },
        //        new eDisk()
        //        {
        //           status = "Trên kệ",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 6
        //        },
        //        new eDisk()
        //        {
        //           status = "Trên kệ",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 7
        //        },
        //        new eDisk()
        //        {
        //           status = "Trên kệ",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 8
        //        },
        //        new eDisk()
        //        {
        //           status = "Trên kệ",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 9
        //        },
        //        new eDisk()
        //        {
        //           status = "Cho thuê",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 10
        //        },
        //        new eDisk()
        //        {
        //           status = "Trên kệ",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 11
        //        },
        //        new eDisk()
        //        {
        //           status = "Trên kệ",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 12
        //        },
        //        new eDisk()
        //        {
        //           status = "Trên kệ",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 13
        //        },
        //        new eDisk()
        //        {
        //           status = "Trên kệ",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 14
        //        },
        //        new eDisk()
        //        {
        //           status = "Trên kệ",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 15
        //        },
        //        new eDisk()
        //        {
        //           status = "Trên kệ",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 1
        //        },
        //        new eDisk()
        //        {
        //           status = "Trên kệ",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 1
        //        },
        //        new eDisk()
        //        {
        //           status = "Trên kệ",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 2
        //        },
        //        new eDisk()
        //        {
        //           status = "Trên kệ",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 2
        //        },
        //        new eDisk()
        //        {
        //           status = "Cho thuê",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 15
        //        },
        //        new eDisk()
        //        {
        //           status = "Cho thuê",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 5
        //        },
        //        new eDisk()
        //        {
        //           status = "Cho thuê",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 5
        //        },
        //        new eDisk()
        //        {
        //           status = "Cho thuê",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 10
        //        },
        //        new eDisk()
        //        {
        //           status = "Cho thuê",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 10
        //        },
        //        new eDisk()
        //        {
        //           status = "Cho thuê",
        //           dateAdd = DateTime.Now,
        //           diskTitleId = 10
        //        },
        //    };
        //    return eDisks;
        //}

        //Khách hàng

        //Phiếu thuê
        //public static List<eRentalBill> GetRentalBill()
        //{
        //    List<eRentalBill> eRentalBills = new List<eRentalBill>()
        //    {
        //        new eRentalBill()
        //        {
        //           hireDate = new DateTime(2020,10,5),
        //           paymentTerm = new DateTime(2020,10,15),
        //           payDate = new DateTime(2020,10,5),
        //           customerID = 1,
        //           diskId = 3
        //        },
        //        new eRentalBill()
        //        {
        //           hireDate = new DateTime(2020,5,7),
        //           paymentTerm = new DateTime(2020,10,17),
        //           payDate = new DateTime(2020,5,7),
        //           customerID = 1,
        //           diskId = 5
        //        },
        //        new eRentalBill()
        //        {
        //           hireDate = new DateTime(2020,11,1),
        //           paymentTerm = new DateTime(2020,11,10),
        //           payDate = new DateTime(2020,11,1),
        //           customerID = 1,
        //           diskId = 16
        //        },
        //        new eRentalBill()
        //        {
        //           hireDate = new DateTime(2020,11,11),
        //           paymentTerm = new DateTime(2020,11,20),
        //           payDate = new DateTime(2020,11,11),
        //           customerID = 1,
        //           diskId = 21
        //        },
        //        new eRentalBill()
        //        {
        //           hireDate = new DateTime(2020,4,5),
        //           paymentTerm = new DateTime(2020,4,15),
        //           payDate = new DateTime(2020,4,5),
        //           customerID = 1,
        //           diskId = 22
        //        },

        //        new eRentalBill()
        //        {
        //           hireDate = new DateTime(2020,10,1),
        //           paymentTerm = new DateTime(2020,10,10),
        //           payDate = new DateTime(2020,10,1),
        //           customerID = 2,
        //           diskId = 18
        //        },
        //        new eRentalBill()
        //        {
        //           hireDate = new DateTime(2020,11,9),
        //           paymentTerm = new DateTime(2020,11,20),
        //           payDate = new DateTime(2020,11,9),
        //           customerID = 2,
        //           diskId = 17
        //        },
        //        new eRentalBill()
        //        {
        //           hireDate = new DateTime(2020,11,15),
        //           paymentTerm = new DateTime(2020,11,25),
        //           payDate =  new DateTime(2020,11,15),
        //           customerID = 3,
        //           diskId = 23
        //        },
        //        new eRentalBill()
        //        {
        //           hireDate = new DateTime(2020,12,1),
        //           paymentTerm = new DateTime(2020,12,7),
        //           payDate = new DateTime(2020,12,1),
        //           customerID = 3,
        //           diskId = 25
        //        },
        //        new eRentalBill()
        //        {
        //           hireDate = new DateTime(2020,9,2),
        //           paymentTerm = new DateTime(2020,9,12),
        //           payDate = new DateTime(2020,9,2),
        //           customerID = 4,
        //           diskId = 20
        //        },
        //    };
        //    return eRentalBills;
        //}

        //Phí phạt
        //public static List<eLateCharge> GetLateCharges()
        //{
        //    List<eLateCharge> eLateCharges = new List<eLateCharge>()
        //    {
        //        new eLateCharge()
        //        {
        //           lateFee = 2000,
        //           status = false,
        //           rentalBillId = 1
        //        },
        //         new eLateCharge()
        //        {
        //           lateFee = 2000,
        //           status = false,
        //           rentalBillId = 2
        //        },
        //          new eLateCharge()
        //        {
        //           lateFee = 2000,
        //           status = false,
        //           rentalBillId = 3
        //        },
        //           new eLateCharge()
        //        {
        //           lateFee = 1500,
        //           status = false,
        //           rentalBillId = 4
        //        },
        //            new eLateCharge()
        //        {
        //           lateFee = 1500,
        //           status = false,
        //           rentalBillId = 5
        //        },

        //    };
        //    return eLateCharges;
        //}

        //Đặt trước
        //public static List<eReservation> GetReservations()
        //{
        //    List<eReservation> eReservations = new List<eReservation>()
        //    {
        //        new eReservation()
        //        {
        //           dateOrder = new DateTime(2020,11,1),
        //           diskTitleId = 1,
        //           customerID = 1
        //        },
        //        new eReservation()
        //        {
        //           dateOrder = new DateTime(2020,11,5),
        //           diskTitleId = 1,
        //           customerID = 2
        //        },
        //        new eReservation()
        //        {
        //           dateOrder = new DateTime(2020,11,15),
        //           diskTitleId = 1,
        //           customerID = 3
        //        },
        //        new eReservation()
        //        {
        //           dateOrder = new DateTime(2020,11,20),
        //           diskTitleId = 1,
        //           customerID = 4
        //        },
        //    };
        //    return eReservations;
        //}
    }
}
