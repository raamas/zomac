'use client';

import React, { useState, useRef } from 'react';
import {
  Boxes,
  PlusCircle,
  RotateCcw,
  Plus,
  Trash2,
  Download,
  FileSpreadsheet,
  PackageCheck,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export const AdminPanel = () => {
  const {
    products,
    updateStock,
    deleteProduct,
    addProduct,
    resetDemoStock,
    clearAllProducts,
    importProducts,
    showToast,
  } = useShop();

  const [showAddForm, setShowAddForm] = useState(false);
  const fileInputRef = useRef(null);
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'proteccion',
    stock: 10,
    badge: '',
    description: '',
  });

  const totalModels = products.length;
  const totalUnits = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock < 3).length;
  const outOfStockCount = products.filter((p) => p.stock <= 0).length;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.description) return;

    addProduct(newProd);

    setNewProd({
      name: '',
      category: 'proteccion',
      stock: 10,
      badge: '',
      description: '',
    });
    setShowAddForm(false);
  };

  const handleExportExcel = async () => {
    const XLSX = await import('xlsx');
    const rows = products.map((p) => ({ id: p.id, name: p.name, stock: p.stock }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventario');
    XLSX.writeFile(wb, 'inventario.xlsx');
    showToast('Archivo Excel descargado (id, nombre y stock).');
  };

  const handleImportExcel = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;

    const XLSX = await import('xlsx');
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data, { type: 'array' });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    if (!rows.length) {
      showToast('El archivo no contiene datos válidos.', true);
      return;
    }

    const normalized = rows.map((r, idx) => {
      const existing = products.find((p) => p.id === r.id || p.name === r.name);
      const parsedStock = parseInt(r.stock, 10);
      return {
        id: existing
          ? existing.id
          : String(r.id ?? '').trim() || 'item-' + Date.now() + '-' + idx,
        name: String(r.name ?? '').trim() || (existing ? existing.name : ''),
        category: existing ? existing.category : 'proteccion',
        stock: isNaN(parsedStock) ? (existing ? existing.stock : 0) : Math.max(0, parsedStock),
        badge: existing ? existing.badge : '',
        badgeType: existing ? existing.badgeType : '',
        description: existing ? existing.description : '',
      };
    }).filter((p) => p.name);

    const seen = new Set();
    const result = [];
    for (const row of normalized) {
      if (seen.has(row.id)) continue;
      seen.add(row.id);
      result.push(row);
    }
    for (const p of products) {
      if (!seen.has(p.id)) result.push(p);
    }

    importProducts(result);
  };

  const stats = [
    { label: 'Total Artículos', value: totalModels },
    { label: 'Stock Total', value: `${totalUnits} uds.` },
    { label: 'Bajo Stock (<3)', value: lowStockCount },
    { label: 'Agotados', value: outOfStockCount },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center gap-3 px-6">
          <Boxes size={26} className="text-whatsapp" />
          <div>
            <h3 className="font-display text-lg font-bold">Panel de Control de Inventario y Stock</h3>
            <p className="text-sm text-muted-foreground">
              Gestión de existencias y catálogo de donaciones en tiempo real
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="gap-1 p-4">
            <span className="text-xs text-muted-foreground">{s.label}</span>
            <strong className="font-display text-2xl">{s.value}</strong>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setShowAddForm(true)}>
            <PlusCircle size={18} /> Agregar Artículo o Servicio
          </Button>
          <Button variant="secondary" onClick={resetDemoStock}>
            <RotateCcw size={18} /> Restablecer Stock Demo
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="border-rose-accent/50 text-rose-accent hover:bg-rose-accent/10 hover:text-rose-accent" onClick={clearAllProducts}>
            <Trash2 size={18} /> Vaciar Catálogo (Temporal)
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            style={{ display: 'none' }}
            onChange={handleImportExcel}
          />
          <Button variant="secondary" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
            <FileSpreadsheet size={18} /> Importar Excel
          </Button>
          <Button variant="secondary" onClick={handleExportExcel}>
            <Download size={18} /> Exportar Excel
          </Button>
        </div>
      </div>

      {showAddForm && (
        <Card>
          <h4 className="flex items-center gap-2 px-6 font-semibold">
            <Plus size={18} className="text-whatsapp" /> Nuevo Artículo o Servicio al Catálogo
          </h4>
          <form onSubmit={handleAddSubmit} className="grid gap-4 px-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="np-name">Nombre del Artículo o Servicio *</Label>
                <Input
                  id="np-name"
                  type="text"
                  placeholder="Ej. Casco de Seguridad"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Categoría</Label>
                <Select
                  value={newProd.category}
                  onValueChange={(v) => setNewProd({ ...newProd, category: v })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proteccion">Protección</SelectItem>
                    <SelectItem value="primeros-auxilios">Primeros Auxilios</SelectItem>
                    <SelectItem value="agua">Agua</SelectItem>
                    <SelectItem value="alimentos">Alimentos</SelectItem>
                    <SelectItem value="iluminacion">Iluminación</SelectItem>
                    <SelectItem value="comunicacion">Comunicación</SelectItem>
                    <SelectItem value="herramientas">Herramientas</SelectItem>
                    <SelectItem value="servicios">Servicios</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="np-stock">Stock Inicial (Unidades) *</Label>
                <Input
                  id="np-stock"
                  type="number"
                  min="0"
                  value={newProd.stock}
                  onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="np-badge">Etiqueta / Badge</Label>
                <Input
                  id="np-badge"
                  type="text"
                  placeholder="Ej. Nuevo, Oferta"
                  value={newProd.badge}
                  onChange={(e) => setNewProd({ ...newProd, badge: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="np-desc">Descripción *</Label>
              <Input
                id="np-desc"
                type="text"
                placeholder="Ej. Talla, material, capacidad o caducidad"
                value={newProd.description}
                onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-2 pb-2">
              <Button type="submit">Guardar Producto</Button>
              <Button type="button" variant="secondary" onClick={() => setShowAddForm(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card className="gap-0 p-0">
        <div className="px-6 pb-3 pt-5">
          <h4 className="flex items-center gap-2 font-semibold">
            <PackageCheck size={18} className="text-whatsapp" /> Inventario Actual
          </h4>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Unidades en Stock</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => {
              const isOut = p.stock <= 0;
              const isLow = p.stock > 0 && p.stock < 3;

              return (
                <TableRow key={p.id}>
                  <TableCell>
                    <span className="block font-medium">{p.name}</span>
                    <span className="block max-w-[280px] truncate text-xs text-muted-foreground">
                      {p.description}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{p.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-7"
                        onClick={() => updateStock(p.id, p.stock - 1)}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        className="h-8 w-16 text-center"
                        value={p.stock}
                        min="0"
                        onChange={(e) => updateStock(p.id, parseInt(e.target.value, 10))}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-7"
                        onClick={() => updateStock(p.id, p.stock + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={isOut ? 'destructive' : isLow ? 'secondary' : 'default'}
                      className={isLow ? 'text-amber-accent' : ''}
                    >
                      {isOut ? 'Agotado' : isLow ? 'Bajo Stock' : 'En Stock'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-rose-accent"
                      onClick={() => deleteProduct(p.id)}
                      title="Eliminar producto"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
