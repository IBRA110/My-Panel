namespace Core.Helpers
{
    public static class CalculatingTime
    {
        public static int CalculateAge(this DateTime dob)
        {
            DateTime today = DateTime.Today;
            Int32 age = today.Year - dob.Year;

            if (dob.Date > today.AddYears(-age))
            {
                age--;
            }
            return age;
        }
    }
}