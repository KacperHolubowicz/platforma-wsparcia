using PlatformaWsparciaAPI.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatformaWsparciaAPI.Data.DTO
{
    public class ProductDTO
    {
        public ProductType ProductType { get; set; }
        public string ProductName { get; set; }
    }
}
