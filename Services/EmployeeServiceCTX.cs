using Project.Model;
using Project.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Services
{
    public class EmployeeServiceCTX : IEmployeeService
    {
        private EmployeesContext _dbContext;

        public EmployeeServiceCTX(EmployeesContext dbContext)
        {
            this._dbContext = dbContext;
        }

        int IEmployeeService.AddEmployee(Employee employee)
        {
            _dbContext.Employees.Add(employee);
            return _dbContext.SaveChanges();
        }

        List<Employee> IEmployeeService.FetchAll()
        {
            return _dbContext.Employees.ToList();
        }

        int IEmployeeService.RemoveEmployee(Employee employee)
        {
            _dbContext.Remove(employee);
            return _dbContext.SaveChanges();
        }

        int IEmployeeService.UpdateEmployee(Employee employee)
        {
            throw new NotImplementedException();
        }
    }
}
