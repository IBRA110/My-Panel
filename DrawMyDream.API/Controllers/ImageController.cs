using API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DrawMyDream.API.Controllers
{
    [Authorize]
    public class ImageController : BaseApiController
    {
        [HttpPost]
        public string UploadImage([FromForm]IFormFile file)
        {
            try
            {
                string FileName = file.FileName;

                string uniqueFileName = Guid.NewGuid().ToString() + "_" + FileName;

                string imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/", FileName);
                
                file.CopyTo(new FileStream(imagePath, FileMode.Create));

                return "File Uploaded Successfully";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}