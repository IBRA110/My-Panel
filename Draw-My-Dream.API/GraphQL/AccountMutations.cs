using API.DTOs;
using Infrastracture.Data;

namespace API.GraphQL
{
    public class AccountMutations
    {
        [UseProjection]
        public async Task<SuccessDTO> Registration(RegisterDTO registerDTO)
        {
            return new SuccessDTO
            {
                Message = "Registration Successful"
            };
        }
    }
}