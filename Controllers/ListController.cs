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

        [HttpDelete]
        public HttpResponse<Employee> Delete([FromBody] Employee toDelete)
        {
            _employeeService.RemoveEmployee(toDelete);
            return new HttpResponse<Employee> { Data = toDelete };
        }

        [HttpPut]
        public HttpResponse<Employee> Patch([FromBody] Employee newEmployee)
        {
            _employeeService.AddEmployee(newEmployee);
            return new HttpResponse<Employee> { Data = newEmployee };
        }

        [HttpPatch]
        public HttpResponse<Employee> Patch([FromBody] EmployeePatch patchDetails)
        {
            var oldEmployee = new Employee { Name = patchDetails.OldName, Value = patchDetails.OldValue };
            var newEmployee = new Employee { Name = patchDetails.NewName, Value = patchDetails.NewValue };
            int updatedEmployees = _employeeService.UpdateEmployee(oldEmployee, newEmployee);

            // success case
            if(updatedEmployees > 0)
            {
                return new HttpResponse<Employee>
                {
                    Data = newEmployee,
                };
            }

            // failed case
            return new HttpResponse<Employee>
            {
                IsError = true,
                ErrorMessage = "Failed to update employee"
            };
        }

        [HttpGet]
        [ActionName("Increment")]
        [Route("/List/Increment")]
        public HttpResponse<List<Employee>> Increment()
        {
            _employeeService.Increment();
            return new HttpResponse<List<Employee>> { Data = _employeeService.FetchAll() };
        }

        [HttpGet]
        [ActionName("Summed")]
        [Route("/List/Summed")]
        public HttpResponse<List<Employee>> Summed()
        {
            return new HttpResponse<List<Employee>> { Data = _employeeService.GetSummed() };
        }
    }
}
