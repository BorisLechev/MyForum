using Microsoft.AspNetCore.Identity;
using MyForum.Data.Common.Models;
using System;

namespace MyForum.Data.Models
{
    public class UserRole : IdentityRole, IAuditInfo, IDeletableEntity
    {
        public UserRole()
            : this(null)
        {
        }

        public UserRole(string name)
            : base(name)
        {
            this.Id = Guid.NewGuid().ToString();
        }

        // Audit info
        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }


        // Deletable entity
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
