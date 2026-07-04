import { useState, useEffect, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Autosave,
  Essentials,
  Paragraph,
  Alignment,
  AutoImage,
  Autoformat,
  ImageBlock,
  BlockQuote,
  Bold,
  Code,
  CodeBlock,
  Emoji,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Fullscreen,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  ImageCaption,
  ImageInsertViaUrl,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageInline,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  MediaEmbed,
  MediaEmbedStyle,
  MediaEmbedToolbar,
  Mention,
  RemoveFormat,
  ShowBlocks,
  SourceEditing,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  Title,
  TodoList,
  Underline,
  ImageUpload,
  CKBox,
  CloudServices,
  ImageInsert,
  PictureEditing,
  BalloonToolbar,
  BlockToolbar
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

const CLOUD_SERVICES_TOKEN_URL =
  'https://m856tcg92m3s.cke-cs.com/token/dev/088a1d3c16cc6f06b10480edb59b079ca633c259b4e472a0cd1aa841ca5c?limit=10';

export default function Editor({ props }) {
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        root: {
          placeholder: 'Type or paste your content here!',
          initialData: props?.initialData || "",
        },
        toolbar: {
          items: [
            'undo', 'redo', '|',
            'sourceEditing', 'showBlocks', 'textPartLanguage', 'fullscreen', '|',
            'heading', 'style', '|',
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
            'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'code', 'removeFormat', '|',
            'emoji', 'horizontalLine', 'link', 'insertImage', 'mediaEmbed', 'insertTable', 'highlight', 'blockQuote', 'codeBlock', '|',
            'alignment', '|',
            'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
          ],
          shouldNotGroupWhenFull: false
        },
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          Autosave,
          BalloonToolbar,
          BlockQuote,
          BlockToolbar,
          Bold,
          CKBox,
          CloudServices,
          Code,
          CodeBlock,
          Emoji,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          Fullscreen,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          HtmlComment,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          // ❌ Markdown, PasteFromMarkdownExperimental, aur PlainTableOutput ko yahan se remove kar diya hai
          MediaEmbed,
          MediaEmbedStyle,
          MediaEmbedToolbar,
          Mention,
          Paragraph,
          PictureEditing,
          RemoveFormat,
          ShowBlocks,
          SourceEditing,
          Strikethrough,
          Style,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableToolbar,
          TextPartLanguage,
          TextTransformation,
          Title,
          TodoList,
          Underline
        ],
        licenseKey: 'GPL',
        autosave: {},
        balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
        blockToolbar: [
          'fontSize', 'fontColor', 'fontBackgroundColor', '|',
          'bold', 'italic', '|',
          'link', 'insertImage', 'insertTable', '|',
          'bulletedList', 'numberedList', 'outdent', 'indent'
        ],
        cloudServices: {
          tokenUrl: CLOUD_SERVICES_TOKEN_URL
        },
        fontFamily: {
          supportAllValues: true
        },
        fontSize: {
          options: [10, 12, 14, 'default', 18, 20, 22],
          supportAllValues: true
        },
        fullscreen: {
          onEnterCallback: container =>
            container.classList.add(
              'editor-container',
              'editor-container_classic-editor',
              'editor-container_include-style',
              'editor-container_include-block-toolbar',
              'editor-container_include-fullscreen',
              'main-container'
            )
        },
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
            { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
          ]
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true
            }
          ]
        },
        image: {
          toolbar: ['toggleImageCaption', 'imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText']
        },
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          decorators: {
            toggleDownloadable: {
              mode: 'manual',
              label: 'Downloadable',
              attributes: {
                download: 'file'
              }
            }
          }
        },
        mediaEmbed: {
          toolbar: ['mediaEmbed:breakText', 'mediaEmbed:wrapText']
        },
        mention: {
          feeds: [
            { marker: '@', feed: [] }
          ]
        },
        style: {
          definitions: [
            { name: 'Article category', element: 'h3', classes: ['category'] },
            { name: 'Title', element: 'h2', classes: ['document-title'] },
            { name: 'Subtitle', element: 'h3', classes: ['document-subtitle'] },
            { name: 'Info box', element: 'p', classes: ['info-box'] },
            { name: 'CTA Link Primary', element: 'a', classes: ['button', 'button--green'] },
            { name: 'CTA Link Secondary', element: 'a', classes: ['button', 'button--black'] },
            { name: 'Marker', element: 'span', classes: ['marker'] },
            { name: 'Spoiler', element: 'span', classes: ['spoiler'] }
          ]
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        }
      }
    };
  }, [isLayoutReady]);

  useEffect(() => {
    if (editorConfig) {
      configUpdateAlert(editorConfig);
    }
  }, [editorConfig]);

  return (
    <div className="main-container">
      <div className="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-block-toolbar editor-container_include-fullscreen">
        <div className="editor-container__editor">
          {editorConfig && (
            <CKEditor
              editor={ClassicEditor}
              config={editorConfig}
              data={props.initialData || ""}
              onChange={(event, editor) => {
                if (props.onChange) {
                  props.onChange(event, editor);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function configUpdateAlert(config) {
  if (configUpdateAlert.configUpdateAlertShown) {
    return;
  }
  const isModifiedByUser = (currentValue, forbiddenValue) => {
    if (currentValue === forbiddenValue || currentValue === undefined) return false;
    return true;
  };
  const valuesToUpdate = [];
  configUpdateAlert.configUpdateAlertShown = true;
  if (!isModifiedByUser(config.licenseKey, '<YOUR_LICENSE_KEY>')) {
    valuesToUpdate.push('LICENSE_KEY');
  }
  if (!isModifiedByUser(config.cloudServices?.tokenUrl, '<YOUR_CLOUD_SERVICES_TOKEN_URL>')) {
    valuesToUpdate.push('CLOUD_SERVICES_TOKEN_URL');
  }
}