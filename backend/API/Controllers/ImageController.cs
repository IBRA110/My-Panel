using AutoMapper;
using Core.DTOs.ImageDTOs;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ImageController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public ImageController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpPost("upload-avatar")]
        public async Task<ActionResult<ImageUpdateDTO>> AddPhoto([FromForm] IFormFile file)
        {
            AppUserEntity user = await _unitOfWork.userRepository.GetUserByIdAsync(Ulid.Parse(User.FindFirst("Id").Value));

            string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;

            ImageEntity photo = new ImageEntity
            {
                Url = "images/" + uniqueFileName
            };

            if (user.Images.Count > 0)
            {
                ImageEntity avatar = user.Images.FirstOrDefault(x => x.IsMain);

                if (avatar != null)
                {
                    System.IO.File.Delete(Directory.GetCurrentDirectory() + "/wwwroot/" + avatar.Url);
                    user.Images.Remove(avatar);
                }
            }

            photo.IsMain = true;
            user.Images.Add(photo);


            if (await _unitOfWork.Complete())
            {
                string imagePath = System.IO.Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/", uniqueFileName);

                FileStream fileStream = new FileStream(imagePath, FileMode.Create);
                file.CopyTo(fileStream);
                fileStream.Close();

                return new ImageUpdateDTO
                {
                    Url = "/images/" + uniqueFileName
                };
            }

            return BadRequest("Error!");
        }
    }
}