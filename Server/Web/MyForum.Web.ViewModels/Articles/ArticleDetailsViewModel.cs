﻿namespace MyForum.Web.ViewModels.Articles
{
    using System;
    using System.Linq;

    using AutoMapper;
    using MyForum.Data.Models;
    using MyForum.Services.Mapping;

    public class ArticleDetailsViewModel : IMapFrom<Article>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string AuthorUserName { get; set; }

        public DateTime CreatedOn { get; set; }

        public int VotesCount { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Article, ArticleDetailsViewModel>()
                .ForMember(dest => dest.VotesCount, opt => opt.MapFrom(src => src.Votes.Sum(v => (int)v.Type)));
        }
    }
}
