using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public WeatherController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet]
        public async Task<IActionResult> GetWeather()
        {
            try
            {
                string url =
                    "https://api.open-meteo.com/v1/forecast" +
                    "?latitude=34.0224" +
                    "&longitude=-118.2851" +
                    "&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m" +
                    "&temperature_unit=fahrenheit" +
                    "&wind_speed_unit=mph";

                var response = await _httpClient.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode(
                        502,
                        new { message = "Unable to retrieve weather data." }
                    );
                }

                string json = await response.Content.ReadAsStringAsync();

                using JsonDocument document = JsonDocument.Parse(json);

                JsonElement current = document.RootElement.GetProperty("current");

                return Ok(new
                {
                    temperature = current.GetProperty("temperature_2m").GetDouble(),
                    feelsLike = current.GetProperty("apparent_temperature").GetDouble(),
                    weatherCode = current.GetProperty("weather_code").GetInt32(),
                    windSpeed = current.GetProperty("wind_speed_10m").GetDouble()
                });
            }
            catch (Exception error)
            {
                Console.WriteLine($"Weather API error: {error.Message}");

                return StatusCode(
                    500,
                    new { message = "Weather service failed." }
                );
            }
        }
    }
}