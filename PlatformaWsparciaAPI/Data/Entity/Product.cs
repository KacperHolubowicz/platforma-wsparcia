﻿namespace PlatformaWsparciaAPI.Data.Entity
{
    public class Product
    {
        public int ProductID { get; set; }
        public ProductType ProductType { get; set; }
        public string ProductName { get; set; }
        public Person Person { get; set; }
    }
}
