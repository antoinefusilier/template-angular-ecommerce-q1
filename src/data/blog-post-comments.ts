import { PostCommentsList } from '../app/shared/interfaces/post-comments-list';

export const postComments: PostCommentsList = {
    count: 4,
    items: [
        {
            avatar: 'assets/images/avatars/avatar-1',
            author: 'Jessica Moore',
            date: 'November 30, 2018',
            text: 'Aliquam ullamcorper elementum sagittis. Etiam lacus lacus, mollis in mattis in, vehicula eu nulla. ' +
                  'Nulla nec tellus pellentesque.',
            children: [
                {
                    avatar: 'assets/images/avatars/avatar-2',
                    author: 'Adam Taylor',
                    date: 'December 4, 2018',
                    text: 'Ut vitae finibus nisl, suscipit porttitor urna. Integer efficitur efficitur velit non pulvinar. ' +
                          'Aliquam blandit volutpat arcu vel tristique. Integer commodo ligula id augue tincidunt faucibus.'
                },
                {
                    avatar: 'assets/images/avatars/avatar-3',
                    author: 'Helena Garcia',
                    date: 'December 12, 2018',
                    text: 'Suspendisse dignissim luctus metus vitae aliquam. Vestibulum sem odio, ullamcorper a imperdiet a, ' +
                          'tincidunt sed lacus. Sed magna felis, consequat a erat ut, rutrum finibus odio.'
                }
            ]
        },
        {
            avatar: 'assets/images/avatars/avatar-4',
            author: 'Ryan Ford',
            date: 'December 5, 2018',
            text: 'Nullam at varius sapien. Sed sit amet condimentum elit.'
        }
    ]
};
