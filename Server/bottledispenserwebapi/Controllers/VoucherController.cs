using Microsoft.AspNetCore.Mvc;

namespace bottledispenserwebapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VoucherController : ControllerBase
    {
        private readonly ILogger<VoucherController> _logger;

        public VoucherController(ILogger<VoucherController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "RegisterNewVoucher")]
        public IActionResult Post(Guid dispenseClient, Guid sessionId, int totalAmount)
        {
            _logger.LogInformation($"Registered a new voucher for {totalAmount} NOK in the session {sessionId} from client {dispenseClient}");
            return Ok();
        }
    }
}