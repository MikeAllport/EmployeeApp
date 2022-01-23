using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Model
{
    public class HttpResponse<T>
    {
        public T Data { get; set; }
        public bool IsError { get; set; }
        public string ErrorMessage { get; set; }
    }
}
