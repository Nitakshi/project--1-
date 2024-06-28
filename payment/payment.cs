using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace PaymentGateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        [HttpPost]
        public IActionResult Charge([FromBody]PaymentModel model)
        {
            // Set your Stripe secret key
            StripeConfiguration.SetApiKey("sk_test_YOUR_STRIPE_SECRET_KEY");

            // Create a new Stripe customer
            var customerService = new CustomerService();
            var customer = customerService.Create(new CustomerCreateOptions
            {
                Email = model.Email,
                Source = model.Token
            });

            // Create a new Stripe charge
            var chargeService = new ChargeService();
            var charge = chargeService.Create(new ChargeCreateOptions
            {
                Amount = model.Amount,
                Currency = "usd",
                Customer = customer.Id,
                Description = "Payment for [Your Product/Service]"
            });

            // Check if the charge was successful
            if (charge.Status == "succeeded")
            {
                // Payment was successful, return a success response
                return Ok(new { message = "Payment successful!" });
            }
            else
            {
                // Payment failed, return an error response
                return BadRequest(new { message = "Payment failed. Please try again." });
            }
        }
    }

    public class PaymentModel
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public int Amount { get; set; }
    }
}