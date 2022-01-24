using Project.Model;
using Project.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;

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
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = $"INSERT INTO Employees (Name, Value) " +
                    $"Values ('{employee.Name}', {employee.Value})";
                return queryCmd.ExecuteNonQuery();
            }
        }

        List<Employee> IEmployeeService.FetchAll()
        {
            return _dbContext.Employees.ToList();
        }

        int IEmployeeService.RemoveEmployee(Employee employee)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = $"DELETE FROM Employees " +
                    $"WHERE Name='{employee.Name}' AND Value={employee.Value}";
                return queryCmd.ExecuteNonQuery();
            }
        }

        int IEmployeeService.UpdateEmployee(Employee oldEmployee, Employee newEmployee)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = $"UPDATE Employees SET Name='{newEmployee.Name}', Value={newEmployee.Value} " +
                    $"WHERE Name='{oldEmployee.Name}' AND Value={oldEmployee.Value}";
                return queryCmd.ExecuteNonQuery();
            }
        }

        void IEmployeeService.Increment()
        {
            // get employees with specific first name letters
            var employeesWithNameStartingWithE = new List<Employee>();
            var employeesWithNameStartingWithG = new List<Employee>();
            var allOtherEmployees = new List<Employee>();
            foreach(var employee in _dbContext.Employees)
            {
                if(EmployeesNameStartsWith('e', employee))
                {
                    employeesWithNameStartingWithE.Add(employee);
                }
                else if (EmployeesNameStartsWith('g', employee))
                {
                    employeesWithNameStartingWithG.Add(employee);
                }
                else
                {
                    allOtherEmployees.Add(employee);
                }
            }

            // update employees in db
            SqliteTransaction transaction = null;
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            try
            {
                int updatedEmployees = 0;
                using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
                {
                    connection.Open();
                    transaction = connection.BeginTransaction();

                    // update names with e + 1
                    foreach(var employee in employeesWithNameStartingWithE)
                    {
                        updatedEmployees += UpdateEmployeesValue(employee, connection, 1);
                    }

                    // update names with g + 10
                    foreach (var employee in employeesWithNameStartingWithG)
                    {
                        updatedEmployees += UpdateEmployeesValue(employee, connection, 10);
                    }

                    // update all others + 100
                    // update names with g
                    foreach (var employee in allOtherEmployees)
                    {
                        updatedEmployees += UpdateEmployeesValue(employee, connection, 100);
                    }

                    transaction.Commit();
                }
            } 
            catch (Exception e)
            {
                // error somewhere, revert transaction
                if(transaction != null)
                    transaction.Rollback();
            }
        }

        bool EmployeesNameStartsWith(char firstLetter, Employee employee) => employee.Name.ToLower()[0] == firstLetter;

        int UpdateEmployeesValue(Employee employee, SqliteConnection connection, int increment)
        {
            var command = connection.CreateCommand();
            command.CommandText = $"UPDATE Employees SET Value={employee.Value + increment} " +
                $"WHERE Name='{employee.Name}' AND Value={employee.Value}";
            return command.ExecuteNonQuery();
        }

        List<Employee> IEmployeeService.GetSummed()
        {
            int sumA = 0, sumB = 0, sumC = 0;
            int total = 11171;
            var returnEmployees = new List<Employee>();
            foreach (var employee in _dbContext.Employees)
            {
                if (EmployeesNameStartsWith('a', employee))
                {
                    sumA += employee.Value;
                }
                else if (EmployeesNameStartsWith('b', employee))
                {
                    sumB += employee.Value;
                }
                else if (EmployeesNameStartsWith('c', employee))
                {
                    sumC += employee.Value;
                }
            }
            if (sumA >= total)
            {
                returnEmployees.Add(new Employee() { Name = "A", Value = sumA });
            }
            if (sumB >= total)
            {
                returnEmployees.Add(new Employee() { Name = "B", Value = sumB });
            }
            if (sumC >= total)
            {
                returnEmployees.Add(new Employee() { Name = "C", Value = sumC });
            }
            return returnEmployees;
        }
    }
}
