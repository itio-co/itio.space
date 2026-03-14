export const defaultDbml = `Table users {
  id integer [pk, increment]
  username varchar [not null, unique]
  email varchar [not null, unique]
  password_hash varchar [not null]
  created_at timestamp [default: \`now()\`]
  role_id integer [ref: > roles.id]
}

Table roles {
  id integer [pk, increment]
  name varchar [not null, unique]
  description text
}

Table posts {
  id integer [pk, increment]
  title varchar [not null]
  content text
  status varchar [default: 'draft']
  author_id integer [ref: > users.id]
  created_at timestamp [default: \`now()\`]
  updated_at timestamp
}

Table comments {
  id integer [pk, increment]
  content text [not null]
  post_id integer [ref: > posts.id]
  user_id integer [ref: > users.id]
  created_at timestamp [default: \`now()\`]
}

Table tags {
  id integer [pk, increment]
  name varchar [not null, unique]
}

Table post_tags {
  post_id integer [ref: > posts.id]
  tag_id integer [ref: > tags.id]

  indexes {
    (post_id, tag_id) [pk]
  }
}
`
