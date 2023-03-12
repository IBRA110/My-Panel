namespace Core.Helpers
{
    public static class DateTime
    {
        public static int CalculateAge(this System.DateTime dob)
        {
            var today = System.DateTime.Today;
            var age = today.Year - dob.Year;
            if (dob.Date > today.AddYears(-age)) age--;
            return age;
        }
    }
}