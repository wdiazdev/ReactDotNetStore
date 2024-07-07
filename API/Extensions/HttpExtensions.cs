using System.Text.Json;
using API.RequestHelpers;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, MetaData metaData)
        {
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            
            response.Headers.Append("Pagination", JsonSerializer.Serialize(metaData, options));

            //The "Access-Control-Expose-Headers" response header is used in CORS 
            //(Cross-Origin Resource Sharing) to expose certain headers to the client. 
            //By default, a client (such as a web browser) can only access a limited 
            //set of response headers when making a cross-origin HTTP request. 

            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }
    }
}