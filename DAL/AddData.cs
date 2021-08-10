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
                   diskTypeId = "GAME",
                   diskName = "Đĩa game",
                   rentalCharge = 15000,
                   lateFee = 3000,
                   rentalPeriod = 7
                },
                new DiskType()
                {
                   diskTypeId = "MOVIE",
                   diskName = "Đĩa phim",
                   rentalCharge = 17000,
                   lateFee = 3500,
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
                new DiskTitle()
                {
                   diskTitleName = "Godzilla vs. Kong",
                   diskTypeId = "MOVIE",
                   diskTitleCode = "GvK"
                },
                new DiskTitle()
                {
                   diskTitleName = "The Tomorrow War",
                   diskTypeId = "MOVIE",
                   diskTitleCode = "TmrWar"
                },
                new DiskTitle()
                {
                   diskTitleName = "Black Widow",
                   diskTypeId = "MOVIE",
                   diskTitleCode = "BW"
                },
                new DiskTitle()
                {
                   diskTitleName = "Avengers: Endgame",
                   diskTypeId = "MOVIE",
                   diskTitleCode = "AvgEG"
                },
                new DiskTitle()
                {
                   diskTitleName = "Valorant",
                   diskTypeId = "GAME",
                   diskTitleCode = "Vlr"
                },
                new DiskTitle()
                {
                   diskTitleName = "Counter-Strike: Global Offensive",
                   diskTypeId = "GAME",
                   diskTitleCode = "CSGO"
                },
                new DiskTitle()
                {
                   diskTitleName = "Call of Duty: Warzone",
                   diskTypeId = "GAME",
                   diskTitleCode = "CodWz"
                },
                new DiskTitle()
                {
                   diskTitleName = "PlayerUnknown's Battlegrounds",
                   diskTypeId = "GAME",
                   diskTitleCode = "PUBG"
                },
                new DiskTitle()
                {
                   diskTitleName = "Grand Theft Auto V",
                   diskTypeId = "GAME",
                   diskTitleCode = "GTA5"
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
                   customerCode = "KH_1",
                   customerName = "Châu Nguyễn Duy Toàn",
                   customerAddress = "Việt nam",
                   customerPhone = "0123456789"
                },
                new Customer()
                {
                    customerID = Guid.NewGuid(),
                   customerCode = "KH_2",
                   customerName = "Nguyễn Đình Thành",
                   customerAddress = "Việt nam",
                   customerPhone = "0123456789"
                },
                new Customer()
                {
                    customerID = Guid.NewGuid(),
                   customerCode = "KH_3",
                   customerName = "Hoàng Như Việt Tường",
                   customerAddress = "Việt nam",
                   customerPhone = "0123456789"
                },
                new Customer()
                {
                    customerID = Guid.NewGuid(),

                   customerName = "Nguyễn Anh Tuấn",
                   customerCode = "KH_4",
                   customerAddress = "Việt nam",
                   customerPhone = "0123456789"
                },
            };
            return eCustomers;
        }
    }
}
