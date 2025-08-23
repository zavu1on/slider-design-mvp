'use client';

import { type FC, useEffect } from 'react';
import { Edit, Grid2X2Plus, Image, Settings } from 'lucide-react';
import {
  selectSetUserMaterials,
  useUserMaterialsStore,
} from '@/entities/canvas';
import type { Material } from '@/generated/prisma';
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
import {
  ElementEditor,
  Elements,
  ImageLoader,
  ProjectNameInput,
  ProjectSettings,
} from './lib';
import { LobbyLink } from './ui';

const SIDEBAR_ITEMS = [
  {
    title: 'Настройки',
    icon: Settings,
    body: <ProjectSettings />,
  },
  {
    title: 'Элементы',
    icon: Grid2X2Plus,
    body: <Elements />,
  },
  {
    title: 'Изображения',
    icon: Image,
    body: <ImageLoader />,
  },
  {
    title: 'Редактор',
    icon: Edit,
    body: <ElementEditor />,
  },
];

type EditorSidebarProps = {
  projectId: string;
  name: string;
  materials: Material[];
};

export const EditorSidebar: FC<EditorSidebarProps> = ({
  projectId,
  name,
  materials,
}) => {
  const setMaterials = useUserMaterialsStore(selectSetUserMaterials);

  useEffect(() => {
    setMaterials(materials);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-row bg-slate-200 slider-container">
      <Sidebar className="editor-sidebar">
        <SidebarContent className="bg-gray-800 text-slate-300">
          <SidebarGroup>
            <SidebarGroupLabel className="text-white font-bold w-full">
              <ProjectNameInput projectId={projectId} initialName={name} />
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
          <LobbyLink />
        </SidebarFooter>
      </Sidebar>
      <SidebarTrigger className="hover:bg-gray-800 hover:text-slate-300 rounded-l-none transition-all" />
    </div>
  );
};
