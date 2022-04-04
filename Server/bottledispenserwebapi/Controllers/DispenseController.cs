using Microsoft.AspNetCore.Mvc;

namespace bottledispenserwebapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DispenseController : ControllerBase
    {
        private readonly ILogger<DispenseController> _logger;

        public DispenseController(ILogger<DispenseController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "RegisterNewDispensable")]
        public IActionResult Post(Guid dispenseClient, Guid sessionId, DispenseType type)
        {
            _logger.LogInformation($"Registered a new {type} in the session {sessionId} from client {dispenseClient}");
            return Ok();
        }
    }

    public enum DispenseType
    {
        Can,
        Bottle
    }
}