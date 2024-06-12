using API.Data;
using API.Entities;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;
     
        public ProductsController(StoreContext context)
        {
            _context = context;
           
        }

        [HttpGet]
        public async Task<ApiResponse<List<Product>>> GetProducts()
        {
        try
            {
                var products = await _context.Products.ToListAsync();
                return new ApiResponse<List<Product>>(
                    success: true, 
                    data: products, 
                    message: "Products fetched successfully", 
                    statusCode: 200
                    );
            }
            catch (Exception ex)
            {
                return new ApiResponse<List<Product>>(
                    success: false, 
                    data: null, 
                    message: ex.Message, 
                    statusCode: 500
                    );
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<Product>>> GetProduct(int id)
        {
            try
            {
                var product = await _context.Products.FindAsync(id);
                if (product == null)
                {
                    return new ApiResponse<Product>(
                        success: false, 
                        data: null, 
                        message: "Product not found", 
                        statusCode: 404
                    );
                }
                return new ApiResponse<Product>(
                    success: true, 
                    data: product, 
                    message: "Product fetched successfully", 
                    statusCode: 200
                    );
            }
            catch (Exception ex)
            {
                return new ApiResponse<Product>(
                    success: false, 
                    data: null, 
                    message: ex.Message, 
                    statusCode: 500
                    );
            }
        }
    }
}