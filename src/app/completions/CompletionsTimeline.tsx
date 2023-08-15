"use client";

import { BookmarkRounded, DeleteRounded } from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab";
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Controller } from "react-hook-form";
import { RelativeDate } from "~/components/RelativeDate";
import {
  useCompletion,
  useCompletionForm,
  type Completion,
} from "~/hooks/completions";

type CompletionsTimelineItemProps = {
  completion: Completion;
};

function CompletionsTimelineItem(props: CompletionsTimelineItemProps) {
  const {
    completion,
    isEditing,
    onEdit,
    onCancelEdit,
    onDelete,
    openDeleteConfirm,
    onOpenDeleteConfirm,
    onCloseDeleteConfirm,
  } = useCompletion(props.completion);

  return (
    <TimelineItem key={completion.id}>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector sx={{ opacity: 0.3 }} />
      </TimelineSeparator>
      <TimelineContent sx={{ pb: 3, pr: 0 }}>
        <Box sx={{ display: "flex" }}>
          <Box onClick={isEditing ? onCancelEdit : onEdit} sx={{ flex: 1 }}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: 1 }}>
                <RelativeDate date={completion.completedAt} />
              </Box>
              {!isEditing && (
                <Typography
                  variant="body2"
                  sx={(theme) => ({
                    color: theme.vars.palette.text.secondary,
                    fontSize: theme.typography.body2.fontSize,
                  })}
                >
                  {/* 時刻まで表示する */}
                  {format(completion.completedAt, "yyyy-MM-dd (eee) HH:mm", {
                    locale: ja,
                  })}
                </Typography>
              )}
            </Box>
            {completion.activity?.name}
          </Box>
          {isEditing && (
            <IconButton
              onClick={onOpenDeleteConfirm}
              color="warning"
              sx={{ flexShrink: 1, p: 2 }}
            >
              <DeleteRounded />
            </IconButton>
          )}
        </Box>

        <Collapse in={isEditing}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", py: 2 }}>
            <CompletionEditor
              completion={completion}
              onCancelEdit={onCancelEdit}
            />
          </Box>

          <Dialog
            open={openDeleteConfirm}
            onClose={onCloseDeleteConfirm}
            aria-labelledby="confirmation-to-delete-completion"
            aria-describedby="confirmation-describe-to-delete-completion"
          >
            <Box sx={{ p: 4 }}>
              <DialogTitle
                id="confirmation-to-delete-completion"
                sx={{ px: 0, pt: 0 }}
              >
                本当に削除しますか？
              </DialogTitle>
              <DialogContent sx={{ px: 0 }}>
                <DialogContentText id="confirmation-describe-to-delete-completion">
                  この操作は取り消せません。
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ px: 0, pb: 0 }}>
                <Button
                  onClick={onCloseDeleteConfirm}
                  color="inherit"
                  autoFocus
                >
                  戻る
                </Button>
                <Button
                  onClick={onDelete}
                  startIcon={<DeleteRounded />}
                  color="warning"
                  variant="contained"
                >
                  削除する
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        </Collapse>
      </TimelineContent>
    </TimelineItem>
  );
}

type CompletionEditorProps = CompletionsTimelineItemProps & {
  onCancelEdit: () => void;
};

function CompletionEditor(props: CompletionEditorProps) {
  const { onUpdate, control } = useCompletionForm(props);
  return (
    <form>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          control={control}
          name="completedAt"
          render={({ field }) => (
            <DateTimePicker
              {...field}
              label={"完了日時"}
              value={props.completion.completedAt}
            />
          )}
        />
      </LocalizationProvider>
      <IconButton
        type="submit"
        onClick={onUpdate}
        sx={{ flexShrink: 1, p: 2 }}
        color="inherit"
      >
        <BookmarkRounded />
      </IconButton>
    </form>
  );
}

type CompletionsTimelineProps = {
  completions: Completion[];
};

export function CompletionsTimeline({ completions }: CompletionsTimelineProps) {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
        px: 0,
      }}
    >
      {completions.map((completion) => (
        <CompletionsTimelineItem key={completion.id} completion={completion} />
      ))}
    </Timeline>
  );
}
