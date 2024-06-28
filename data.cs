using Microsoft.EntityFrameworkCore;
using ShopEasy.Models;

public class ShopEasyDbContext : DbContext
{
    public ShopEasyDbContext(DbContextOptions<ShopEasyDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Customer> Customers { get; set; }
}