import Link from "next/link";

import CalendarIcon from "@/assets/calendar-icon.svg";
import { PostCover } from "@/components";
import { AppRoutes } from "@/config/routes";
import { IPost } from "@/types/post";
import { formatDate } from "@/utils/formats";

import styles from "./styles.module.css";

const getPostExcerpt = (post: IPost) => {
  if (post.content.length > 300) {
    return `${post.content.substring(0, 300)}...`;
  }
  return post.content;
};

interface IProps {
  isAdmin: boolean;
  post: IPost;
}

const Post = ({ isAdmin, post }: IProps) => {
  return (
    <li className={styles["list-item"]}>
      <Link
        href={
          isAdmin
            ? `${AppRoutes.AdminNews}/${post.id}`
            : `${AppRoutes.News}/${post.id}`
        }
      >
        <PostCover imageId={post.coverImg} />
        <div className={styles["content-wrapper"]}>
          <h3 className={styles["subtitle"]}>{post.title}</h3>
          <div
            className={styles["excerpt"]}
            dangerouslySetInnerHTML={{
              __html: getPostExcerpt(post),
            }}
          />
          <div className={styles["date"]}>
            <CalendarIcon />
            {formatDate(post.publishDate)}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Post;
