using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Project.Model
{
    [DataContract]
    public class EmployeePatch
    {
        [DataMember]
        public string OldName { get; set; }
        [DataMember]
        public int OldValue { get; set; }
        [DataMember]
        public string NewName { get; set; }
        [DataMember]
        public int NewValue { get; set; }
    }
}
