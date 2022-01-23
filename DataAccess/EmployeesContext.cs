using Project.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.DataAccess
{
    public class EmployeesContext : DbContext
    {
        private static string _dbPath = "./SqliteDB.db";

        public virtual DbSet<Employee> Employees { get; set; }
        public string DbPath { get { return _dbPath; } }

        public EmployeesContext()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlite($"Data Source={DbPath}");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("Employees");
                entity.HasNoKey();
                entity.Property(e => e.Name)
                    .HasColumnName("Name")
                    .HasColumnType("VARCHAR")
                    .HasMaxLength(50);
                entity.Property(e => e.Value)
                    .HasColumnName("Value")
                    .HasColumnType("INT");
            });
        }
    }
}
