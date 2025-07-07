import { FC } from 'react';
import { Grid2X2Plus, Image, Settings, Sparkles, Type } from 'lucide-react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/generated/shadcn/accordion';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/generated/shadcn/sidebar';
import { Button } from '@/shared/ui';
import { SettingsContent } from './SettingsContent';

const SIDEBAR_ITEMS = [
  {
    title: 'Настройки',
    icon: Settings,
    body: <SettingsContent />,
  },
  {
    title: 'Элементы',
    icon: Grid2X2Plus,
    body: <p>Заглушка</p>,
  },
  {
    title: 'Изображения',
    icon: Image,
    body: <p>Заглушка</p>,
  },
  {
    title: 'Текст',
    icon: Type,
    body: <p>Заглушка</p>,
  },
  {
    title: 'AI',
    icon: Sparkles,
    body: <p>Заглушка</p>,
  },
];

type EditorSidebarProps = {
  name: string;
};

export const EditorSidebar: FC<EditorSidebarProps> = ({ name }) => {
  return (
    <div className="flex flex-row bg-slate-200">
      <Sidebar className="editor-sidebar">
        <SidebarContent className="bg-gray-800 text-slate-300">
          <SidebarGroup>
            <SidebarGroupLabel className="text-white font-bold">
              {name}
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-2">
              <SidebarMenu>
                <Accordion type="single" collapsible>
                  {SIDEBAR_ITEMS.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <AccordionItem value={item.title}>
                        <AccordionTrigger>
                          <SidebarMenuButton
                            asChild
                            className="hover:bg-slate-300 active:bg-slate-300"
                          >
                            <div className="cursor-pointer">
                              <item.icon />
                              <span>{item.title}</span>
                            </div>
                          </SidebarMenuButton>
                        </AccordionTrigger>
                        <AccordionContent className="mt-4">
                          {item.body}
                        </AccordionContent>
                      </AccordionItem>
                    </SidebarMenuItem>
                  ))}
                </Accordion>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-gray-800">
          <Link href="/slides">
            <Button className="w-full hover:underline">
              К списку проектов
            </Button>
          </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarTrigger className="hover:bg-gray-800 hover:text-slate-300 rounded-l-none transition-all" />
    </div>
  );
};
