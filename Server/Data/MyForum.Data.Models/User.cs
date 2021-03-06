namespace MyForum.Data.Models
{
    using System;
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Identity;
    using MyForum.Data.Common.Models;

    public class User : IdentityUser, IAuditInfo, IDeletableEntity
    {
        public User()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Comments = new HashSet<Comment>();
        }

        // Audit info
        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        // Deletable entity
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
