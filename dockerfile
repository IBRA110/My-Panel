FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

COPY Draw-My-Dream.sln ./

COPY Draw-My-Dream.API/*.csproj ./Draw-My-Dream.API/
COPY Draw-My-Dream.Infrastructure/*.csproj ./Draw-My-Dream.Infrastructure/
COPY Draw-My-Dream.Core/*.csproj ./Draw-My-Dream.Core/

RUN dotnet restore

COPY . ./

WORKDIR Draw-My-Dream.API/
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app

COPY --from=build-env /app/Draw-My-Dream.API/drawmydream.db .
COPY --from=build-env app/Draw-My-Dream.API/out .

ENTRYPOINT ["dotnet", "API.dll"]