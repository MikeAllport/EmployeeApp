using Project.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Services
{
    public interface IEmployeeService
    {
        public List<Employee> FetchAll();
        public int AddEmployee(Employee employee);
        public int UpdateEmployee(Employee oldEmployee, Employee newEmployee);
        public int RemoveEmployee(Employee remployee);
        public void Increment();
        public List<Employee> GetSummed();
    }
}
