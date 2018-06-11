﻿using System.Collections.Generic;
using System.Linq;
using Android.App;
using Android.Views;
using Android.Widget;
using Firebase.Xamarin.Auth;
using PartyOrganizer.Core.Model.Party;
using PartyOrganizer.Core.Repository.Interfaces;
using Square.Picasso;

namespace PartyOrganizer.Adapters
{
    class PendingListAdapter : BaseAdapter<Core.Model.Member.User>
    {
        private List<Core.Model.Member.User> _pendingUsers;
        private readonly Party _party;
        private readonly FirebaseAuthLink _authLink;
        private IPartyRepositoryAsync _partyRepository;
        private Activity _context;

        public PendingListAdapter(Activity context, List<Core.Model.Member.User> pendingUsers,
            IPartyRepositoryAsync partyRepository, Party party, FirebaseAuthLink authLink)
        {
            this._context = context;
            _pendingUsers = pendingUsers;
            _partyRepository = partyRepository;
            _party = party;
            _authLink = authLink;
        }

        public override View GetView(int position, View convertView, ViewGroup parent)
        {
            var pendingUser = _pendingUsers[position];

            if (convertView == null)
            {
                convertView = _context.LayoutInflater.Inflate(Resource.Layout.PartyPendingRowView, null);
            }

            FindViews(convertView, out ImageView partyPendingImageView, out TextView partyPendingNameTextView,
                                   out Button partyPendingRefuseButton, out Button partyPendingAcceptButton);

            HandleEvents(pendingUser, partyPendingRefuseButton, partyPendingAcceptButton);

            BindData(pendingUser, partyPendingImageView, partyPendingNameTextView);

            return convertView;
        }

        private void BindData(Core.Model.Member.User pendingUser, ImageView partyPendingImageView, TextView partyPendingNameTextView)
        {
            Picasso.With(_context)
                   .Load(pendingUser.Image)
                   .Into(partyPendingImageView);

            partyPendingNameTextView.Text = pendingUser.Name;
        }

        private void FindViews(View convertView, out ImageView partyPendingImageView, out TextView partyPendingNameTextView, out Button partyPendingRefuseButton, out Button partyPendingAcceptButton)
        {
            partyPendingImageView = convertView.FindViewById<ImageView>(Resource.Id.partyPendingImageView);
            partyPendingNameTextView = convertView.FindViewById<TextView>(Resource.Id.partyPendingNameTextView);
            partyPendingRefuseButton = convertView.FindViewById<Button>(Resource.Id.partyPendingRefuseButton);
            partyPendingAcceptButton = convertView.FindViewById<Button>(Resource.Id.partyPendingAcceptButton);

            if (_authLink.User.LocalId != GetHost()?.Id)
            {
                partyPendingAcceptButton.Enabled = false;
                partyPendingRefuseButton.Enabled = false;
            }
        }

        private Core.Model.Member.User GetHost()
        {
            var host = _party.Members.FirstOrDefault(u => u.Type.ToLower() == "host");
            return host;
        }

        private void HandleEvents(Core.Model.Member.User pendingUser, Button partyPendingRefuseButton, Button partyPendingAcceptButton)
        {
            partyPendingRefuseButton.Click += (s, e) =>
            {
                _partyRepository.RefuseRequest(_party, pendingUser);
            };

            partyPendingAcceptButton.Click += (s, e) =>
            {
                _partyRepository.AcceptRequest(_party, pendingUser);
            };
        }

        public override int Count => _pendingUsers.Count;

        public override Core.Model.Member.User this[int position] => _pendingUsers[position];

        public override long GetItemId(int position) => position;
    }
}