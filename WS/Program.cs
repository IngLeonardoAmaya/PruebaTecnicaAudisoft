using CapaDatos;
using CapaNegocio;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuración de la conexión a la base de datos
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
builder.Services.AddTransient<Conexion>();

// Registro de servicios de negocio
builder.Services.AddScoped<EstudianteBL>();
builder.Services.AddScoped<ProfesorBL>();
builder.Services.AddScoped<NotaBL>();

// Registro de servicios de datos
builder.Services.AddScoped<EstudianteDAL>();
builder.Services.AddScoped<ProfesorDAL>();
builder.Services.AddScoped<NotaDAL>();

/*****************************************************
* HABILITAR CORS
*****************************************************/
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
/*****************************************************
 * FIN HABILITAR CORS
 *****************************************************/

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

/*****************************************************
* HABILITAR CORS
*****************************************************/
app.UseCors("AllowAll");
/*****************************************************
 * FIN HABILITAR CORS
 *****************************************************/

app.Run();
