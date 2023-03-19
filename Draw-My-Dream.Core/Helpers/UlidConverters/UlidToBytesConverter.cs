using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Core.Helpers.UlidConverters
{
    public class UlidToBytesConverter : ValueConverter<Ulid, byte[]>
    {
        private static readonly ConverterMappingHints DefaultHints = new ConverterMappingHints(size: 16);

        public UlidToBytesConverter(ConverterMappingHints mappingHints = null)
            : base(
                    convertToProviderExpression: x => x.ToByteArray(),
                    convertFromProviderExpression: x => new Ulid(x),
                    mappingHints: DefaultHints.With(mappingHints))
        {
        }
    }

}
