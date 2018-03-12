﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using PartyOrganizer.Core.Model.Interfaces;

namespace PartyOrganizer.Core.Model
{
    public class Party : IEntity<Party>
    {
        public int ID { get; set; }

        public string ShortDescription { get; set; }

        public string Description { get; set; }

        public string Location { get; set; }

        public User Admin { get; set; }

        public IEnumerable<User> Participants { get; set; }

        public string ImagePath { get; set; }

        public DateTime Date { get; set; }

        public bool Equals(Party other)
        {
            if (other == null) return false;
            if (other.ID == this.ID)
                return true;
            else
                return false;
        }
    }
}