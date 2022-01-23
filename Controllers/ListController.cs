using Microsoft.AspNetCore.Mvc;
using Project.Model;
using Project.Services;
using System.Collections.Generic;

namespace Project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListController : ControllerBase
    {
        private IEmployeeService _employeeService;
        public ListController(IEmployeeService employeeService)
        {
            this._employeeService = employeeService;
        }

        /*
         * List API methods goe here
         * */

        [HttpGet]
        public HttpResponse<List<Employee>> Get()
        {
            return new HttpResponse<List<Employee>>
                {
                    Data = _employeeService.FetchAll()
                };
        }

        [HttpPut]
        public HttpResponse<Employee> Put(Employee employee)
        {
            var updatedItems = _employeeService.UpdateEmployee(employee);
            return updatedItems > 0 ?
                new HttpResponse<Employee> { Data = employee } :
                new HttpResponse<Employee> { IsError = true, ErrorMessage = "Failed to update employee", Data = employee };
        }
    }
}
