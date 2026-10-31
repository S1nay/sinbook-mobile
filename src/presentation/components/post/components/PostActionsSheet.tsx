import { useUnistyles } from 'react-native-unistyles';

import ListOptionsSheetModal from '@components/sheet-modals/list-options-sheet-modal';
import { BottomSheetModal } from '@ui/bottom-sheet';
import { ConfirmModal } from '@ui/confirm-modal';

import { PostActionsSheetProps } from '../types';

const PostActionsSheet = (props: PostActionsSheetProps) => {
  const { postId, onEdit, onDelete } = props;
  const { theme } = useUnistyles();

  const iconColor = theme.colors.foreground.primary;

  const handleEdit = () => {
    BottomSheetModal.hide();
    onEdit(postId);
  };

  const handleDelete = () => {
    BottomSheetModal.hide();
    ConfirmModal.show({
      title: 'Remove post?',
      message: 'This action cannot be undone. The post, its likes and comments will be deleted.',
      confirmText: 'Remove',
      onConfirm: () => onDelete(postId),
    });
  };

  return (
    <ListOptionsSheetModal
      options={[
        {
          title: 'Edit post',
          icon: { name: 'pencil', size: 24, stroke: iconColor },
          onPress: handleEdit,
        },
        {
          title: 'Remove post',
          icon: { name: 'trash', size: 24, stroke: iconColor },
          onPress: handleDelete,
        },
      ]}
    />
  );
};

export default PostActionsSheet;
