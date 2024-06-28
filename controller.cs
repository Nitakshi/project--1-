using Microsoft.AspNetCore.Mvc;
using ShopEasy.Models;
using ShopEasy.Data;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ShopEasyDbContext _context;

    public ProductsController(ShopEasyDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetProducts()
    {
        return Ok(_context.Products.ToList());
    }

    [HttpGet("{id}")]
    public IActionResult GetProduct(int id)
    {
        var product = _context.Products.Find(id);
        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }

    [HttpPost]
    public IActionResult CreateProduct(Product product)
    {
        _context.Products.Add(product);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateProduct(int id, Product product)
    {
        var existingProduct = _context.Products.Find(id);
        if (existingProduct == null)
        {
            return NotFound();
        }
        existingProduct.Name = product.Name;
        existingProduct.Price = product.Price;
        existingProduct.Description = product.Description;
        _context.SaveChanges();
        return Ok(existingProduct);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteProduct(int id)
    {
        var product = _context.Products.Find(id);
        if (product == null)
        {
            return NotFound();
        }
        _context.Products.Remove(product);
        _context.SaveChanges();
        return NoContent();
    }
}

// Repeat the above process for Categories, Orders, and Customers controllers